import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const formEmail = document.querySelector('.feedback-form input[name=email]');
const formMessage = document.querySelector(
  '.feedback-form textarea[name=message]'
);

const localStorageKey = 'feedback-form-state';
const formStorage = {
  getData: () => {
    let email = '';
    let message = '';
    const formDataJSON = localStorage.getItem(localStorageKey);
    if (formDataJSON !== null) {
      const formData = JSON.parse(formDataJSON);
      email = formData.email || '';
      message = formData.message || '';
    }
    return { email, message };
  },
  setData: ({ email, message }) => {
    const formDataJSON = JSON.stringify({ email, message });
    localStorage.setItem(localStorageKey, formDataJSON);
  },
  removeData: () => {
    localStorage.removeItem(localStorageKey);
  },
};

// Restore form fields from local storage
const formData = formStorage.getData();
formEmail.value = formData.email;
formMessage.value = formData.message;

// Submit button event handler
form.addEventListener('submit', event => {
  event.preventDefault();
  const { email, message } = event.currentTarget.elements;

  // Check if both fields are filled
  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }

  const formData = { email: email.value, message: message.value };

  console.log(formData);
  event.currentTarget.reset();
  formStorage.removeData();
});

// Text input event handler
form.addEventListener(
  'input',
  throttle(event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const formData = formStorage.getData();
    formData[fieldName] = fieldValue;
    formStorage.setData(formData);
  }, 500)
);
