let labelName = document.querySelector('label[for="name"]');
let jobSelect = document.querySelector('#title');
let otherJob = document.querySelector('input[name="other-job-role"]');

let colorDiv = document.querySelector('div[id="shirt-colors"]');
let colorSelect = document.querySelector('#color');
let designLabel = document.querySelector('select[id="design"]')

let activitiesField = document.querySelector('#activities')
let activityCost = document.querySelector('#activities-cost')
let activitiesBox = document.querySelector("#activities-box");
let totalCost = 0;

let paymentSelect = document.querySelector('select[id="payment"]')
let divPayPal = document.querySelector('#paypal');
let divBitcoin = document.querySelector('#bitcoin');

let form = document.querySelector('form');
let userName = document.querySelector('input[name="user-name"]');
let nameValid = document.querySelector('#name-hint')
let userEmail = document.querySelector('input[name="user-email"]')
let emailValid = document.querySelector('#email-hint')

let creditNum = document.querySelector('input[id="cc-num"]')
let zipNum = document.querySelector('input[id="zip"]')
let cvvNum = document.querySelector('input[id="cvv"]')
let creditValid = document.querySelector('#cc-hint')
let zipValid = document.querySelector('#zip-hint')
let cvvValid = document.querySelector('#cvv-hint')
let activitiesValid = document.querySelector('#activities-hint')

let activityInputs = Array.from(activitiesBox.querySelectorAll('input'));
let activityBtns = activityInputs.forEach((btn) => {
    console.log(btn.parentElement)
})

let regex = /^\w{1,}@\w{1,}\.(com|net)$/i
let creditRegex = /^\d{13,16}$/
let zipRegex = /^\d{5}$/
let cvvRegex = /^\d{3}$/

paymentSelect.value = "credit-card"

otherJob.hidden = true;
colorDiv.hidden = true;

divBitcoin.hidden = true;
divPayPal.hidden = true;


window.onload = function () {
    labelName.focus();
}

jobSelect.addEventListener("change", (event) => {
    if (event.target.value === "other") {
        document.querySelector('option[hidden]').hidden = false;
        otherJob.hidden = false
    } else {
        otherJob.hidden = true;
    }
})



designLabel.addEventListener("change", (event) => {
    colorDiv.hidden = false;
    let arrOptions = Array.from(colorSelect.options);
    arrOptions.forEach(element => element.hidden = false);

    if (event.target.value === "js puns") {
            arrOptions.forEach(element => {
            const val = element.value;

            if (val !== "cornflowerblue" && val !== "darkslategrey" && val !== "gold") {
                element.hidden = true;
            }
        });
    } else if (event.target.value === "heart js") {
        Array.from(colorSelect.options).forEach(element => {
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

    activityCost.textContent = `Total: $${totalCost}`
        
})

paymentSelect.addEventListener("change", (element) => {
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

// remove userName.addEventListener and userEmail.addEventListener.. put logic in form.addEventListener

userName.addEventListener("change", () => {
    if (userName.value.trim() === "") {
        console.log("wrong")
        nameValid.style.display = "block";
        userName.classList.add("error-border")
        userName.setAttribute("aria-invalid", "true")
    }
})

userEmail.addEventListener("change", (event) => {
    // if (userName.value.trim() === "") {
    //     nameValid.style.display = "block";
    //     userName.classList.add("error-border")
    //     userName.setAttribute("aria-invalid", "true")
    // }
    if (regex.test(userEmail.value.trim())) {
        console.log("coret")
    } else {
        console.log("wrog")
        emailValid.style.display = "block";
        userEmail.classList.add("error-border")
        userEmail.setAttribute("aria-invalid", "true")
    }

})

form.addEventListener("submit", (event) => {
    let isActivityChecked = activityInputs.some(checkbox => checkbox.checked);
    let cardCheck = creditRegex.test(creditNum.value)
    let zipCheck = zipRegex.test(zipNum.value);
    let cvvCheck = cvvRegex.test(cvvNum.value);


    function isValid(elemCheck, elemValid) {
        let parent = elemValid.parentElement;

        if (!elemCheck) {
            event.preventDefault();
            elemValid.style.display = "block";
            parent.classList.remove("valid")
            parent.classList.add("not-valid")
            console.log(`wrong ${elemValid}`);
        } else {
            parent.classList.remove("not-valid");
            parent.classList.add("valid")
            elemValid.style.display = "none";
        }
    }

    if (paymentSelect.value === "credit-card") {
        isValid(cardCheck, creditValid);
        isValid(zipCheck, zipValid);
        isValid(cvvCheck, cvvValid)
    }

    if (!isActivityChecked) {
        event.preventDefault();
        activityInputs.forEach((btn) => { 
            btn.parentElement.classList.add("not-valid")
        });
        activitiesValid.style.display = "block"
        console.log("No activities Selected!")
    } else {
        activityInputs.forEach((btn) => { 
            btn.parentElement.classList.remove("not-valid")
            btn.parentElement.classList.add("valid")
        });
        activitiesValid.style.display = "block"
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