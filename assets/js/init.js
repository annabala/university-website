document.addEventListener("DOMContentLoaded", () => {
  function debounce(callback, wait) {
    console.log('debounce working');
    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
  }
  initSlider();
  initForm();
  window.addEventListener('scroll', debounce(() => {
    changeNav();
    textAppear();
  }, 200));
});