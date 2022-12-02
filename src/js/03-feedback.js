import throttle from 'lodash.throttle';

const localStorageKey = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const formEmail = document.querySelector('.feedback-form input[name=email]');
const formMessage = document.querySelector(
  '.feedback-form input[name=message]'
);

// Restore form fields from local storage
try {
  const formDataJSON = localStorage.getItem(localStorageKey);
  if (formDataJSON !== null) {
    const formData = JSON.parse(formDataJSON);
    formEmail.value = formData.email || '';
    formMessage.value = formData.message || '';
  }
} catch (error) {
  console.error('Get state error: ', error.message);
  localStorage.removeItem(localStorageKey);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const { email, message } = event.currentTarget.elements;

  //   if (email.value === '' || message.value === '') {
  //     return alert('Please fill in all the fields!');
  //   }

  const formData = { email: email.value, message: message.value };

  console.log(formData);
  event.currentTarget.reset();

  try {
    localStorage.removeItem(localStorageKey);
  } catch (error) {
    console.error('Remove state error: ', error.message);
  }
});

form.addEventListener(
  'input',
  throttle(event => {
    const { email, message } = event.currentTarget.elements;
    const formData = { email: email.value, message: message.value };
    console.log(formData);
    // Backup form data
    try {
      const formDataJSON = JSON.stringify(formData);
      localStorage.setItem(localStorageKey, formDataJSON);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }, 500)
);
