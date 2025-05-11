// Enhanced navbar interactions
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const burgerMenus = document.querySelectorAll('[data-thq="thq-burger-menu"]');
  const mobileMenus = document.querySelectorAll('[data-thq="thq-mobile-menu"]');
  const closeMenus = document.querySelectorAll('[data-thq="thq-close-menu"]');
  
  burgerMenus.forEach((burgerMenu, index) => {
    burgerMenu.addEventListener('click', () => {
      // Add slide-in animation class
      mobileMenus[index].style.display = 'flex';
      mobileMenus[index].classList.add('menu-open');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
  });
  
  closeMenus.forEach((closeMenu, index) => {
    closeMenu.addEventListener('click', () => {
      // Add slide-out animation class
      mobileMenus[index].classList.remove('menu-open');
      setTimeout(() => {
        mobileMenus[index].style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
      }, 300);
    });
  });

  // Add hover pulse effect to nav icons
  const navIcons = document.querySelectorAll('.navbar2-links1 i, .navbar2-links2 i');
  
  navIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.classList.add('icon-pulse');
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.classList.remove('icon-pulse');
      
      // Add a subtle bounce effect when mouse leaves
      icon.classList.add('icon-bounce');
      setTimeout(() => {
        icon.classList.remove('icon-bounce');
      }, 300);
    });
  });

  // Add scroll effect to shrink navbar on scroll
  const navbar = document.querySelector('.navbar2-container');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    
    // Hide/show navbar on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      // Scrolling down, hide navbar
      navbar.classList.add('navbar-hidden');
    } else {
      // Scrolling up, show navbar
      navbar.classList.remove('navbar-hidden');
    }
    
    lastScrollTop = scrollTop;
  });
});