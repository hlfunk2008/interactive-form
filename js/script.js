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

otherJob.setAttribute("hidden", "");

window.onload = function () {
    labelName.focus();
}

jobSelect.addEventListener("change", (event) => {
    if (event.target.value === "other") {
        document.querySelector('option[hidden]').removeAttribute("hidden");
        otherJob.removeAttribute("hidden")
    } else {
        otherJob.setAttribute("hidden", "")
    }
})

colorDiv.setAttribute("hidden", "")

designLabel.addEventListener("change", (event) => {
    colorDiv.removeAttribute("hidden")

    if (event.target.value === "js puns") {
        
    }
})