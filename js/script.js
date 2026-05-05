// let nameField = document.querySelector('label[for="name"]')
// let jobField = document.querySelector('select[id="title"]')
// let otherJobField = document.querySelector('input[name="other-job-role"]')
// otherJobField.setAttribute("hidden", null)
// window.onload = function () {
//     nameField.focus()
// }

// jobField.addEventListener("change", (event) => {
//     if (event.target.value === "other") {
//         document.querySelector('option[hidden]').removeAttribute("hidden");
//         otherJobField.removeAttribute("hidden");
//     } 
// })

let labelName = document.querySelector('label[for="name"]');
let jobSelect = document.querySelector('#title');
let otherJob = document.querySelector('input[name="other-job-role"]');

let colorDiv = document.querySelector('div[id="shirt-colors"]');
let colorSelect = document.querySelector('#color');
let designLabel = document.querySelector('select[id="design"]')

let activitiesField = document.querySelector('#activities')
let activityCost = document.querySelector('#activities-cost')
let totalCost = 0;

let paymentSelect = document.querySelector('select[id="payment"]')
let divPayPal = document.querySelector('#paypal');
let divBitcoin = document.querySelector('#bitcoin');

otherJob.setAttribute("hidden", "");
colorDiv.setAttribute("hidden", "");


window.onload = function () {
    labelName.focus();
    paymentSelect.value = "credit-card"
}

jobSelect.addEventListener("change", (event) => {
    if (event.target.value === "other") {
        document.querySelector('option[hidden]').removeAttribute("hidden");
        otherJob.removeAttribute("hidden")
    } else {
        otherJob.setAttribute("hidden", "")
    }
})



designLabel.addEventListener("change", (event) => {
    colorDiv.removeAttribute("hidden")
    let arrOptions = Array.from(colorSelect.options);
    arrOptions.forEach(element => element.removeAttribute("hidden"));

    if (event.target.value === "js puns") {
            arrOptions.forEach(element => {
            const val = element.value;

            if (val !== "cornflowerblue" && val !== "darkslategrey" && val !== "gold") {
                element.setAttribute("hidden", null);
            }
        });
    } else if (event.target.value === "heart js") {
        Array.from(colorSelect.options).forEach(element => {
            const val = element.value;

            if (val !== "tomato" && val !== "steelblue" && val !== "dimgrey") {
                element.setAttribute("hidden", null)
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


// working on payment info section
paymentSelect.addEventListener("change", (element) => {
    if (element.target.value === "bitcoin") {
        divPayPal.setAttribute("hidden", null)
    } else if (element.target.value === "paypal") {
        divBitcoin.setAttribute("hidden", null);
    } else {
        divPayPal.removeAttribute("hidden")
        divBitcoin.removeAttribute("hidden")
    }
})