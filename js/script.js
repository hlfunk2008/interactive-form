let labelInput = document.querySelector('label[for="name"]'); // Label for name input + span
let jobInput = document.querySelector('#title'); // The selection for job input
let otherJob = document.querySelector('input[name="other-job-role"]'); // Input option for the Other Job Role

let colorContainer = document.querySelector('div[id="shirt-colors"]'); // Shirt info > Colors container
let colorInput = document.querySelector('#color'); // Color select input
let designInput = document.querySelector('select[id="design"]'); // Design select input

let activitiesField = document.querySelector('#activities'); // Activities fieldset includes cost
let costContainer = document.querySelector('#activities-cost'); // Cost container
let activitiesContainer = document.querySelector("#activities-box"); // Activities div

let totalCost = 0;

let paymentInput = document.querySelector('select[id="payment"]'); // Payment input select
let divPayPal = document.querySelector('#paypal'); // paypal info box
let divBitcoin = document.querySelector('#bitcoin'); // bitcoin info box

let form = document.querySelector('form'); // entire form selection
let nameInput = document.querySelector('input[name="user-name"]'); // nameInput input
let nameError = document.querySelector('#name-hint'); // Name error message
let emailInput = document.querySelector('input[name="user-email"]'); // Email input
let emailError = document.querySelector('#email-hint'); // Email error message

let creditInput = document.querySelector('input[id="cc-num"]'); // Credit Card Number Input
let zipInput = document.querySelector('input[id="zip"]'); // Zip Input
let cvvInput = document.querySelector('input[id="cvv"]'); // CVV Input
let creditError = document.querySelector('#cc-hint'); // Credit Card error message
let zipError = document.querySelector('#zip-hint'); // Zip error message
let cvvError = document.querySelector('#cvv-hint'); // CVV error message
let activitiesError = document.querySelector('#activities-hint'); // Activities error message


let activityInputs = Array.from(activitiesContainer.querySelectorAll('input')); // List of activity checkboxes in an array
let activityBtns = activityInputs.forEach((btn) => { return; }); // list of literal checkboxes

let regex = /^\w{1,}@\w{1,}\.(com|net)$/i;
let creditRegex = /^\d{13,16}$/;
let zipRegex = /^\d{5}$/;
let cvvRegex = /^\d{3}$/;

paymentInput.value = "credit-card";

otherJob.hidden = true;
colorContainer.hidden = true;

divBitcoin.hidden = true;
divPayPal.hidden = true;


window.onload = function () {
    labelInput.focus();
}

// 
jobInput.addEventListener("change", (event) => {
    if (event.target.value === "other") {
        document.querySelector('option[hidden]').hidden = false;
        otherJob.hidden = false;
    } else {
        otherJob.hidden = true;
    }
})



designInput.addEventListener("change", (event) => {
    colorContainer.hidden = false;
    let arrOptions = Array.from(colorInput.options);
    arrOptions.forEach(element => element.hidden = false);

    if (event.target.value === "js puns") {
            arrOptions.forEach(element => {
            const val = element.value;

            if (val !== "cornflowerblue" && val !== "darkslategrey" && val !== "gold") {
                element.hidden = true;
            }
        });
    } else if (event.target.value === "heart js") {
        Array.from(colorInput.options).forEach(element => {
            const val = element.value;

            if (val !== "tomato" && val !== "steelblue" && val !== "dimgrey") {
                element.hidden = true;
            }
        })
    }
})

activitiesField.addEventListener("change", (event) => {
    let cost = parseInt(event.target.getAttribute("data-cost"))
    if (event.target.checked) {
        totalCost = totalCost + cost;
    } else {
        totalCost = totalCost - cost;
    }

    costContainer.textContent = `Total: $${totalCost}`
        
})

paymentInput.addEventListener("change", (element) => {
    if (element.target.value === "bitcoin") {
        divBitcoin.hidden = false;
        divPayPal.hidden = true;
    } else if (element.target.value === "paypal") {
        divPayPal.hidden = false;
        divBitcoin.hidden = true;
    } else {
        divBitcoin.hidden = true;
        divPayPal.hidden = true;
    }
})

form.addEventListener("submit", (event) => {
    let isActivityChecked = activityInputs.some(checkbox => checkbox.checked);
    let cardCheck = creditRegex.test(creditInput.value)
    let zipCheck = zipRegex.test(zipInput.value);
    let cvvCheck = cvvRegex.test(cvvInput.value);
    let nameCheck = (nameInput.value.trim() !== "");
    let emailCheck = regex.test(emailInput.value);

    function isValid(elemCheck, elemValid) {
        let parent = elemValid.parentElement;

        if (!elemCheck) {
            event.preventDefault();
            elemValid.style.display = "block";
            parent.classList.remove("valid")
            parent.classList.add("not-valid")
        } else {
            parent.classList.remove("not-valid");
            parent.classList.add("valid")
            elemValid.style.display = "none";
        }
    }

    isValid(nameCheck, nameError);
    isValid(emailCheck, emailError);

    if (paymentInput.value === "credit-card") {
        isValid(cardCheck, creditError);
        isValid(zipCheck, zipError);
        isValid(cvvCheck, cvvError);
    } else {
        creditError.parentElement.classList.remove("not-valid");
        creditError.parentElement.classList.add("valid");
        creditError.style.display = "none";
        zipError.parentElement.classList.remove("not-valid");
        zipError.parentElement.classList.add("valid");
        zipError.style.display = "none";
        cvvError.parentElement.classList.remove("not-valid");
        cvvError.parentElement.classList.add("valid");
        cvvError.style.display = "none";
    }

    if (!isActivityChecked) {
        event.preventDefault();
        activityInputs.forEach((btn) => { 
            btn.parentElement.classList.add("not-valid")
        });
        activitiesError.style.display = "block"
    } else {
        activityInputs.forEach((btn) => { 
            btn.parentElement.classList.remove("not-valid")
            btn.parentElement.classList.add("valid")
        });
        activitiesError.style.display = "none"
    }
})

// add proper validation logic to form - Step 9
activityInputs.forEach((btn) => {
    btn.addEventListener("focus", (event) => {
        event.target.parentElement.classList.add("focus")
    })
})

activityInputs.forEach((btn) => {
    btn.addEventListener("blur", (event) => {
        if (event.target.parentElement.classList.value = "focus") {
            event.target.parentElement.classList.remove("focus")
        }
    })
})


// Step 9... Still.