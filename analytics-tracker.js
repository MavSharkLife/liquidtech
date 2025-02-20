// Initialize analytics storage
if (!localStorage.getItem('siteAnalytics')) {
    localStorage.setItem('siteAnalytics', JSON.stringify({
        pageViews: {},
        userActions: [],
        mouseMovements: [],
        timeSpent: 0
    }));
}

// Track mouse position
function trackMousePosition(e) {
    let analytics = JSON.parse(localStorage.getItem('siteAnalytics'));
    analytics.mouseMovements.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    });

    // Keep only last 1000 movements to prevent storage overflow
    if (analytics.mouseMovements.length > 1000) {
        analytics.mouseMovements.shift();
    }

    localStorage.setItem('siteAnalytics', JSON.stringify(analytics));
}

// Track all user interactions
function trackUserAction(action, details) {
    let analytics = JSON.parse(localStorage.getItem('siteAnalytics'));
    analytics.userActions.push({
        action: action,
        details: details,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    });

    // Keep only last 1000 actions
    if (analytics.userActions.length > 1000) {
        analytics.userActions.shift();
    }

    localStorage.setItem('siteAnalytics', JSON.stringify(analytics));
}

// Previous tracking functions remain the same...

// Enhanced event listeners
document.addEventListener('DOMContentLoaded', () => {
    trackPageView();
    updateDashboard();

    // Mouse movement (throttled to every 100ms)
    let throttleTimer;
    document.addEventListener('mousemove', (e) => {
        if (!throttleTimer) {
            throttleTimer = setTimeout(() => {
                trackMousePosition(e);
                throttleTimer = null;
            }, 100);
        }
    });

    // Clicks with more details
    document.addEventListener('click', (e) => {
        trackUserAction('click', {
            element: e.target.tagName.toLowerCase(),
            text: e.target.textContent?.slice(0, 50),
            id: e.target.id,
            class: e.target.className
        });
    });

    // Scroll events
    document.addEventListener('scroll', (e) => {
        trackUserAction('scroll', {
            position: window.scrollY,
            percentage: (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100).toFixed(2) + '%'
        });
    });

    // Key presses (excluding actual keys for privacy)
    document.addEventListener('keypress', () => {
        trackUserAction('keypress', {
            activeElement: document.activeElement.tagName.toLowerCase()
        });
    });

    // Form interactions
    document.addEventListener('focus', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            trackUserAction('focus', {
                element: e.target.tagName.toLowerCase(),
                type: e.target.type
            });
        }
    }, true);

    // Copy events
    document.addEventListener('copy', () => {
        trackUserAction('copy', {
            selectedText: window.getSelection().toString().slice(0, 50) + '...'
        });
    });
});
