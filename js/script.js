let nameField = document.querySelector('label[for="name"]')
let jobField = document.querySelector('select[id="title"]')
let otherJobField = document.querySelector('input[name="other-job-role"]')
otherJobField.setAttribute("hidden", null)
window.onload = function () {
    nameField.focus()
}

jobField.addEventListener("change", (event) => {
    if (event.target.value === "other") {
        document.querySelector('option[hidden]').removeAttribute("hidden");
        otherJobField.removeAttribute("hidden");
    } 
})

// Finished step 1, partial step 2