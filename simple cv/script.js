let user = []
const inputUser = (name, dob, address) => ({name, dob, address})
user.push(inputUser("Very Harfan", 
"14 February 1995", 
`Jl. Kota Bambu Utara II
Kota Bambu Utara
Palmerah Jakarta Barat`))

const light = (ind, name) => {
    let skill = document.querySelectorAll(`div[name='${name}']`)
    for (let i = 0; i < ind; i++) {
        skill[i].className = "on"
    }
    for (let i = ind; i < skill.length; i++) {
        skill[i].className = "off"
    }
}

const saveData = () => {
    event.preventDefault()
    let form = document.inputData
    let dateOfBirth = form.dob.value.split("-")

    user.push(inputUser(form.name.value, dobFormatter(dateOfBirth), form.address.value))
    form.reset()
    
    let name = document.querySelector(".namevalue")
    let index = findIndexByName(name.innerText)
    previousNextButton(index)
}

const dobFormatter = (dateStringList) => {
    let monthName = ["January", "February", "March", "April", "May", "June", 
            "July","August", "September", "Oktober", "November", "December"]
    let date = ""
    dateStringList[1] = dateStringList[1][0] == "0" ? dateStringList[1][1] : dateStringList[1]
    dateStringList[1] = monthName[dateStringList[1] - 1]
    for (let i = 2; i >= 0 ; i--){
        date += " " + dateStringList[i]
    }
    return date.substring(1)
}

const changeUser = (val) => {
    let name = document.querySelector(".namevalue")
    let dob = document.querySelector(".dobvalue")
    let address = document.querySelector(".addressvalue")
    let _user = inputUser(name.innerText, dob.innerText, address.innerText)
    let newIndex = findIndexByName(name.innerText) + val

    name.innerText = user[newIndex].name
    dob.innerText = user[newIndex].dob
    address.innerText = user[newIndex].address

    previousNextButton(newIndex)
}

const findIndexByName = (name) => {
    for (let i = 0; i < user.length; i++) {
        if (name == user[i].name) {
            return i
        }
    }
}

const previousNextButton = (ind) => {
    let previous = document.querySelector(".previous")
    let next = document.querySelector(".next")
    if (ind == 0) {
        previous.hidden = true
    } else {
        previous.hidden = false
    }
    if (ind == user.length-1) {
        next.hidden = true
    } else {
        next.hidden = false
    }
}

module.exports = {
    dobFormatter
}