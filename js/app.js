// Inputs
const petInput = document.querySelector("#mascota")
const ownerInput = document.querySelector("#propietario")
const phoneInput = document.querySelector("#telefono")
const dateInput = document.querySelector("#fecha")
const hourInput = document.querySelector("#hora")
const symptomsInput = document.querySelector("#sintomas")

// User Interface
// Form
const form = document.querySelector("#nuevo-cita")
// Appoinment
const AppoinmentContainer = document.querySelector("#citas")

// Event listener or event register
eventListener()

function eventListener() {
    // Instead input also we can use "change"
    petInput.addEventListener("input", appoinmentDatas)
    ownerInput.addEventListener("input", appoinmentDatas)
    phoneInput.addEventListener("input", appoinmentDatas)
    dateInput.addEventListener("input", appoinmentDatas)
    hourInput.addEventListener("input", appoinmentDatas)
    symptomsInput.addEventListener("input", appoinmentDatas)
}

//Object with the appoinment information
// Creating an object of the appoinment, we want that while the user is writting this fields are been filling with what user is writting, this is possible with the property "name" in the input defined in the HTML
const appoinmentObject = {
    pet: "",
    owner: "",
    phone: "",
    date: "",
    hour: "",
    symptoms: ""
}

// To read what the user is writting in the input field, with the "change" and the appoinmentDatas function
function appoinmentDatas(e) {
    appoinmentObject[e.target.name] = e.target.value

    console.log("I am the name filled with the value", appoinmentObject)
}



