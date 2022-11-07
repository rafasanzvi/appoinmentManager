// Inputs
const petInput = document.querySelector("#mascota")
const ownerInput = document.querySelector("#propietario")
const phoneInput = document.querySelector("#telefono")
const dateInput = document.querySelector("#fecha")
const hourInput = document.querySelector("#hora")
const symptomsInput = document.querySelector("#sintomas")

let editing 

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
    }

    deleteAppoinment(idAppoinment) {
        this.appoinments = this.appoinments.filter(appoinment => appoinment.id !== idAppoinment)
    }

    editAppoinment(appoinmentUpdated) {
        this.appoinments = this.appoinments.map(appoinment => appoinment.id === appoinmentUpdated.id ? appoinmentUpdated : appoinment)
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

    printAppoinments({appoinments}) {

        this.cleanHTML()
        
        appoinments.forEach(appoinment => {

            const { pet, owner, phone, date, hour, symptoms, id } = appoinment // With the id we can edit or delete any appoinment

            const divAppoinment = document.createElement("div")
            divAppoinment.classList.add("cita", "p-3")
            divAppoinment.dataset.id = id

            // Scripting of the elements of the appoinment
            // Pet
            const petParagraph = document.createElement("h2")
            petParagraph.classList.add("card-title", "font-weight-bolder", "text-capitalize")
            petParagraph.textContent = pet
            // Owner
            const ownerParagraph = document.createElement("p")
            ownerParagraph.classList.add("text-capitalize")
            ownerParagraph.innerHTML = `
                <span class="font-weight-bolder">Owner: </span> ${owner}
            `
            // Phone
            const phoneParagraph = document.createElement("p")
            phoneParagraph.innerHTML = `
                <span class="font-weight-bolder">Phone: </span> ${phone}
            `
            // Date
            const dateParagraph = document.createElement("p")
            dateParagraph.innerHTML = `
                <span class="font-weight-bolder">Date: </span> ${date}
            `
            // Hour
            const hourParagraph = document.createElement("p")
            hourParagraph.innerHTML = `
                <span class="font-weight-bolder">Hour: </span> ${hour}
            `
            // Phone
            const symptomsParagraph = document.createElement("p")
            symptomsParagraph.innerHTML = `
                <span class="font-weight-bolder">Symptoms: </span> ${symptoms}
            `

            // Button to delete the appoinment
            const btnDelete = document.createElement("button")
            btnDelete.classList.add("btn", "btn-danger", "mr-2")
            btnDelete.innerHTML = 'Delete <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"</path></svg>'
            btnDelete.onclick = () => deleteAppoinment(id)

            // Button to edit an appoinment
            const btnEdit = document.createElement("button")
            btnEdit.classList.add("btn", "btn-info")
            btnEdit.innerHTML = 'Edit <svg fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"</path></svg>'
            btnEdit.onclick = () => editAppoinment(appoinment)

            // Add paragraphs to the divAppoinment
            divAppoinment.appendChild(petParagraph)
            divAppoinment.appendChild(ownerParagraph)
            divAppoinment.appendChild(phoneParagraph)
            divAppoinment.appendChild(dateParagraph)
            divAppoinment.appendChild(hourParagraph)
            divAppoinment.appendChild(symptomsParagraph)
            // Adding buttons
            divAppoinment.appendChild(btnDelete)
            divAppoinment.appendChild(btnEdit)

            // Adding the divAppoinment to the HTML
            AppoinmentContainer.appendChild(divAppoinment)
        })
    }

    // Clean HTML
    cleanHTML() {
        while(AppoinmentContainer.firstChild) {
            AppoinmentContainer.removeChild(AppoinmentContainer.firstChild)
        }
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

    if(editing) {
        ui.printAlert("Successfully edited")

        //To pass the appoinment object to editing
        manageAppoinment.editAppoinment({...appoinmentObject})

        //Restarting the create appoinment text to his initial state
        form.querySelector('button[type="submit"]').textContent = "Create appoinment"

        // To avoid editing mode if we are creating a new appoinment
        editing = false

    } else {
        // Generating a new ID
        appoinmentObject.id = Date.now()

        // Creating a new appoinment
        manageAppoinment.addNewAppoinment({ ...appoinmentObject }) // We can create a copy of the object to avoid to have duplicated objects when we make a new appoinment

        //Message of appoinment added correctly
        ui.printAlert("The appoinment was created correctly")
    }

    
    // Restart the appoinmentObject
    restartAppoinmentObject()

    // Restart the form when the appoinment is finished
    form.reset()

    // Show appoinments in the HTML
    ui.printAppoinments(manageAppoinment)
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

function deleteAppoinment(idAppoinment) {
    // Delete appoinment
        manageAppoinment.deleteAppoinment(idAppoinment)
    // Show a message
        ui.printAlert("The appoinment was removed correctly")
    // Restart the appoinments
        ui.printAppoinments(manageAppoinment)
}

// It takes the appoinment datas and the edition mode
function editAppoinment(appoinment) {
    const { pet, owner, phone, date, hour, symptoms, id } = appoinment

    // Fill the inputs with the datas taken from the appoinment object
    petInput.value = pet
    ownerInput.value = owner
    phoneInput.value = phone
    dateInput.value = date
    hourInput.value = hour
    symptomsInput.value = symptoms

    // Fill the appoinment object, with this we have filled the values and the appoinment Object
    appoinmentObject.pet = pet
    appoinmentObject.owner = owner
    appoinmentObject.phone = phone
    appoinmentObject.date = date
    appoinmentObject.hour = hour
    appoinmentObject.symptoms = symptoms
    appoinmentObject.id = id

    // To change the text button
    form.querySelector('button[type="submit"]').textContent = "Save changes"

    editing = true
}



