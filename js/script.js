const labelInput = document.querySelector('label[for="name"]');
const jobInput = document.querySelector('select#title');
const otherJobInput = document.querySelector('input#other-job-role');

otherJobInput.hidden = true;

window.onload = () => {
  labelInput.focus();
  paymentInput.value = 'credit-card';
}

// if other job option selected then show input for a custom job input

jobInput.addEventListener('change', (event) => {
  const jobOther = document.querySelector('option[value="other"]');
  
  if (event.target.value === 'other') {
    jobOther.hidden = false;
    otherJobInput.hidden = false;
  } else {
    otherJobInput.hidden = true;
  }
});

const designInput = document.querySelector('select#design');
const colorDiv = document.querySelector('div#shirt-colors');
const colorInput = document.querySelector('select#color');

colorDiv.hidden = true;

// Detects shirt style and shows what colors are available for that style

designInput.addEventListener('change', (event) => {
  colorDiv.hidden = false;
  const colorOptions = Array.from(colorInput.options);

  colorOptions.forEach(option => option.hidden = false);

  if (event.target.value === "js puns") {
    colorOptions.forEach(option => {
      const val = option.value;

      if (val !== "cornflowerblue" && val !== "darkslategrey" && val !== "gold") {
          option.hidden = true;
        }
    });
  } else if (event.target.value === "heart js") {
    colorOptions.forEach(option => {
      const val = option.value;

      if (val !== "tomato" && val !== "steelblue" && val !== "dimgrey") {
        option.hidden = true;
      }
    });
  }
});

const activitiesField = document.querySelector('fieldset#activities');

// updates the total cost based on what activities are selected

let totalCost = 0;

activitiesField.addEventListener('change', (event) => {
  let cost = parseInt(event.target.getAttribute('data-cost'));
  const costContainer = document.querySelector('#activities-cost');

  if (event.target.checked) {
    totalCost += cost;
  } else {
    totalCost -= cost;
  }

  costContainer.textContent = `Total: $${totalCost}`;
});

const paymentInput = document.querySelector('select#payment');
const bitcoinInfo = document.querySelector('#bitcoin');
const paypalInfo = document.querySelector('#paypal');
const ccInfo = document.querySelector('.credit-card');

bitcoinInfo.hidden = true;
paypalInfo.hidden = true;

// shows or hides info based on what payment is selected

paymentInput.addEventListener('change', (event) => {
  const val = event.target.value;
  
  // if the value is not equal to bitcoin, then bitcoinInfo.hidden = true

  paypalInfo.hidden = (val !== 'paypal');
  bitcoinInfo.hidden = (val !== 'bitcoin');
  ccInfo.querySelectorAll('div').forEach(child => {
    child.hidden = (val !== 'credit-card');
  });
  
});

// helper functions

function errorHint(element) {
  return document.querySelector(`#${element}-hint`);
}

function check(regex, elem) {
  const input = elem.value;

  return regex.test(input);
}

// if element regex test is false => display errors, else display valid

function isValid(elemCheck, elemError) {
  const parent = elemError.parentElement;

  if (!elemCheck) {
    event.preventDefault();
    elemError.style.display = 'block';
    parent.classList.remove('valid');
    parent.classList.add('not-valid');
  } else {
    parent.classList.remove('not-valid');
    parent.classList.add('valid');
    elemError.style.display = 'none';
  }
}

const form = document.querySelector('form');
const activityContainer = document.querySelector('#activities-box');
const activityInputs = Array.from(activityContainer.querySelectorAll('input'));

const creditInput = document.querySelector('input#cc-num');
const zipInput = document.querySelector('input#zip');
const cvvInput = document.querySelector('input#cvv');
const nameInput = document.querySelector('input[name="user-name"]');
const emailInput = document.querySelector('input[name="user-email"]');

const creditError = errorHint('cc');
const zipError = errorHint('zip');
const cvvError = errorHint('cvv');
const nameError = errorHint('name');
const emailError = errorHint('email');
const activityError = errorHint('activities')

const emailRegex = /^\w{1,}@\w{1,}\.(com|net)$/i;
const creditRegex = /^\d{13,16}$/;
const zipRegex = /^\d{5}$/;
const cvvRegex = /^\d{3}$/;

form.addEventListener('submit', (event) => {
  let isActivityChecked = activityInputs.some(checkbox => checkbox.checked);

  isValid((nameInput.value.trim() !== ""), nameError);
  isValid(check(emailRegex, emailInput), emailError);

  // detects credit number, zip, and cvv only if credit card payment is selected.

  if (paymentInput.value === 'credit-card') {
    isValid(check(creditRegex, creditInput), creditError);
    isValid(check(zipRegex, zipInput), zipError);
    isValid(check(cvvRegex, cvvInput), cvvError);
  }

  // detects if an activity is checked, if not display an error

  if (!isActivityChecked) {
    event.preventDefault();
    activityInputs.forEach(btn => {
      btn.parentElement.classList.add('not-valid');
    });
    activityError.style.display = 'block';
  } else {
    activityInputs.forEach(btn => {
      btn.parentElement.classList.remove('not-valid');
      btn.parentElement.classList.add('valid');
    });
    activityError.style.display = 'none';
  }
});

// focuses when an activity is tabbed over

activityInputs.forEach(btn => {
  btn.addEventListener('focus', (event) => {
    event.target.parentElement.classList.add('focus');
  });

  btn.addEventListener('blur', (event) => {
    event.target.parentElement.classList.remove('focus');
  });
});



