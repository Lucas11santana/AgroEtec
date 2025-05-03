document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.meu-carousel-track');
    const slides = document.querySelectorAll('.meu-carousel-slide');
    const prevButton = document.querySelector('.meu-carousel-button.prev');
    const nextButton = document.querySelector('.meu-carousel-button.next');
  
    let currentIndex = 0;
  
    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  
    function showNextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }
  
    function showPrevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    }
  
    nextButton.addEventListener('click', showNextSlide);
    prevButton.addEventListener('click', showPrevSlide);
  
    setInterval(showNextSlide, 10000);
  });
  