function initSlider() {
  const inner = document.querySelector('.carousel__inner');
  const slides = Array.from(inner.children);
  const next = document.querySelector('#btnNext');
  const prev = document.querySelector('#btnPrev');
  const dotsNav = document.querySelector('.carousel__dots');
  const dots = Array.from(document.querySelectorAll('.carousel__indicator'));
  
  const slideWidth = slides[0].getBoundingClientRect().width;
  
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  slides.forEach(setSlidePosition);
  
  const moveToSlide = (inner, currentSlide, targetSlide) => {
    inner.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current');
    targetSlide.classList.add('current');
  }
  
  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current');
    targetDot.classList.add('current');
  }
  
  prev.addEventListener('click', e => {
    const currentSlide = inner.querySelector('.current');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current');
    const prevDot = currentDot.previousElementSibling;
    moveToSlide(inner, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
  
  });
  
  next.addEventListener('click', e => {
    const currentSlide = inner.querySelector('.current');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current');
    const nextDot = currentDot.nextElementSibling;
    moveToSlide(inner, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
  });
  
  
  dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
  
    if(!targetDot) return;
  
    const currentSlide = document.querySelector('.current');
    const currentDot = dotsNav.querySelector('.current');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
  
    moveToSlide(inner, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
  });
}