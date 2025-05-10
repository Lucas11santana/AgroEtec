document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.meu-carousel-track');
  const slides = document.querySelectorAll('.meu-carousel-slide');
  const prevButton = document.querySelector('.meu-carousel-button.prev');
  const nextButton = document.querySelector('.meu-carousel-button.next');
  const indicatorsContainer = document.querySelector('.meu-carousel-indicators');

  let currentIndex = 0;
  let autoSlideInterval;

  // Cria as bolinhas
  slides.forEach((_, index) => {
      const indicator = document.createElement('button');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => {
          currentIndex = index;
          updateCarousel();
          resetAutoSlide();
      });
      indicatorsContainer.appendChild(indicator);
  });

  const indicators = indicatorsContainer.querySelectorAll('button');

  function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach(btn => btn.classList.remove('active'));
      indicators[currentIndex].classList.add('active');
  }

  function showNextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
  }

  function showPrevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
  }

  function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(showNextSlide, 12000);
  }

  nextButton.addEventListener('click', () => {
      showNextSlide();
      resetAutoSlide();
  });

  prevButton.addEventListener('click', () => {
      showPrevSlide();
      resetAutoSlide();
  });

  // Inicia o contador automático
  resetAutoSlide();
});
