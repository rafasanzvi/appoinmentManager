// Inputs
const petInput = document.querySelector("#mascota")
const ownerInput = document.querySelector("#propietario")
const phoneInput = document.querySelector("#telefono")
const dateInput = document.querySelector("#fecha")
const hourInput = document.querySelector("#hora")
const symptomsInput = document.querySelector("#sintomas")

// User Interface
// Form
const form = document.querySelector("#nueva-cita")
// Appoinment
const AppoinmentContainer = document.querySelector("#citas")

// Classes
class Appoinment {
    constructor() {
        this.appoinments = []
    }

    addNewAppoinment(appoinment) {
        this.appoinments = [...this.appoinments, appoinment]

        console.log("I am the appoinments: ", this.appoinments)
    }
}

class UI {
    printAlert(message, typeOfMessage) {
        // Creating div
        const divMessage = document.createElement("div")
        divMessage.classList.add("text-center", "alert", "d-block", "col-12")
        

        // Add class depend the type of error
        if(typeOfMessage === "error") {
            divMessage.classList.add("alert-danger")
        } else {
            divMessage.classList.add("alert-success")
        }

        // Error message
        divMessage.textContent = message

        // Add to the DOM
        document.querySelector("#contenido").insertBefore(divMessage, document.querySelector(".agregar-cita"))

        // Delete error message
        setTimeout(() => {
            divMessage.remove()
        }, 5000)
    }
}

// We instantiate the classes globally for use in various functions
const ui = new UI()
const manageAppoinment = new Appoinment()

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

    form.addEventListener("submit", createNewAppoinment)
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

    // console.log("I am the name filled with the value", appoinmentObject)
}

// Check and add a new appoinment to the appoinment class
function createNewAppoinment(e) {
    e.preventDefault()

    // To get information from the appoinment object
    const { pet, owner, phone, date, hour, symptoms } = appoinmentObject

    // Validate
    if(pet === "" || owner === "" || phone === "" || date === "" || hour === "" || symptoms === "") {
        ui.printAlert("Every fields are required", "error")

        return
    }

    // Generating a new ID
    appoinmentObject.id = Date.now()

    // Creating a new appoinment
    manageAppoinment.addNewAppoinment({...appoinmentObject}) // We can create a copy of the object to avoid to have duplicated objects when we make a new appoinment

    // Restart the appoinmentObject
    restartAppoinmentObject()

    // Restart the form when the appoinment is finished
    form.reset()

    // Show appoinments in the HTML
    
}

// We need to restart the appoinmentObject because although the HTML has been restarted the object in the code is keeping saving the different appoinments
function restartAppoinmentObject() {
    appoinmentObject.pet = ""
    appoinmentObject.owner = ""
    appoinmentObject.phone = ""
    appoinmentObject.date = ""
    appoinmentObject.hour = ""
    appoinmentObject.symptoms = ""
}



