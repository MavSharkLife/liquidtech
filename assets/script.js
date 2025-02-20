document.addEventListener('DOMContentLoaded', () => {
  // Carousel functionality
  const carouselContainer = document.querySelector('.carousel-container');
  const slides = Array.from(document.querySelectorAll('.review-slide'));
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const totalSlides = slides.length;
  let currentIndex = 0;

  const updateSlidePosition = () => {
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
  });

  // Auto-advance slides every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
  }, 5000);
});
