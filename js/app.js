// Inputs
const petInput = document.querySelector("#mascota")
const ownerInput = document.querySelector("#propietario")
const phoneInput = document.querySelector("#telefono")
const dateInput = document.querySelector("#date")
const hourInput = document.querySelector("#hora")
const symptomsInput = document.querySelector("#sintomas")

// Form
const form = document.querySelector("#nuevo-cita")

// Appoinment
const AppoinmentContainer = document.querySelector("#citas")

// Event listener
eventListener()

function eventListener() {
    petInput.addEventListener("change", appoinmentDatas)
}

// To read what the user is writting in the input field, with the "change" and the appoinmentDatas function
function appoinmentDatas(e) {
    console.log("I am the value pet input field: ", e.target.value)
}



