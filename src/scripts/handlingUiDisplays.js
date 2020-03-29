(function() {
  const localStorageBtn = document.querySelector('#localStorageBtn');
  const cookiesBtn = document.querySelector('#cookiesBtn');
  const cookiesForm = document.querySelector('.cookiesForm');
  const localStorageForm = document.querySelector('.localStorageForm');
  const okBtn = document.querySelector('.okBtn');

  /**Event listener for Cookies button */
  localStorageBtn.addEventListener('click', () => {
    localStorageForm.classList.toggle('hideLocalStorageForm');
    cookiesForm.classList.toggle('hideCookiesForm');
  });

  /**Event listener for local storage button */
  cookiesBtn.addEventListener('click', () => {
    cookiesForm.classList.toggle('hideCookiesForm');
    localStorageForm.classList.toggle('hideLocalStorageForm');
  });
  /**Event listener for accept Cookies button */
})();
