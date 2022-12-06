import throttle from 'lodash.throttle';

const localStorageKey = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const formEmail = document.querySelector('.feedback-form input[name=email]');
const formMessage = document.querySelector(
  '.feedback-form textarea[name=message]'
);

// Restore form fields from local storage
const formDataJSON = localStorage.getItem(localStorageKey);
if (formDataJSON !== null) {
  const formData = JSON.parse(formDataJSON);
  formEmail.value = formData.email || '';
  formMessage.value = formData.message || '';
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const { email, message } = event.currentTarget.elements;

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }

  const formData = { email: email.value, message: message.value };

  console.log(formData);
  event.currentTarget.reset();

  localStorage.removeItem(localStorageKey);
});

form.addEventListener(
  'input',
  throttle(event => {
    const { email, message } = event.currentTarget.elements;
    const formData = { email: email.value, message: message.value };
    console.log(formData);

    // Backup form data
    const formDataJSON = JSON.stringify(formData);
    localStorage.setItem(localStorageKey, formDataJSON);
  }, 500)
);
