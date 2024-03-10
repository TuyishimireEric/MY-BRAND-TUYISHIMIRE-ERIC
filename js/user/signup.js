import { signUp } from '../api/index.js';

const userName = document.querySelector('#fullNameInput');
const email = document.querySelector('#emailInput');
const password = document.querySelector('#passwordInput');
const confirmPassword = document.querySelector('#confirmPassword');
const form = document.querySelector('form');
const loader = document.querySelector('.loader');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  form.classList.add('submitted');
  const allInputs = form.querySelectorAll('.input-text');
  const allValid = Array.from(allInputs).every((input) => input.classList.contains('correct'));

  if (allValid) {
    loader.classList.add('show');

    const formData = {
      userName: userName.value,
      email: email.value,
      password: password.value,
    };

    const result = await signUp(formData);
    if (result.ok) {
      // eslint-disable-next-line no-undef
      Toastify({
        text: result.message,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        stopOnFocus: true,
      }).showToast();

      const user = {
        userName: userName.value,
        email: email.value,
      };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(result.data.data));
      loader.classList.remove('show');

      form.classList.remove('submitted');
      allInputs.forEach((input) => input.classList.remove('correct'));
      userName.value = '';
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
      window.location.href = '../../index.html';
    } else {
      loader.classList.remove('show');
      // eslint-disable-next-line no-undef
      Toastify({
        text: result.message || result.error,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        stopOnFocus: true,
      }).showToast();
    }
  }
});

window.onload = async () => {
  document.getElementById('preLoader').style.display = 'none';
};