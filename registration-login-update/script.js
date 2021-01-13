// const { Script } = require("vm")

let userData = [] 
const rowPerPage = 5
let adminSession = true
let activeUser;

//Login function
const login = () => {
    event.preventDefault()

    const loginForm = document.loginForm
    const username = loginForm.usernameLogin.value
    const password = loginForm.passwordLogin.value

    activeUser = findUserByUsernameAndPassword(username, password)
    if (activeUser == false) {
        alert("Username or password wrong")
        return
    }
    if (activeUser.role != "admin") {
        adminSession = false

        // hide create/update user form
        const userForm = document.inputData
        const actionTab = document.querySelector(".action")
        actionTab.hidden = true
        userForm.hidden = true
        filteredResult = userData.filter(data =>{return data.role != "admin"})
    }

    const loginPage = document.querySelector("#loginPage")
    const userPage = document.querySelector("#userPage")
    
    loginPage.hidden = true
    userPage.hidden = false
    loginForm.reset()

    showData(filteredResult)
}

const findUserByUsernameAndPassword = (username, password) => {
    for (let i = 0; i < userData.length; i++) {
        if (username == userData[i].name && password == userData[i].password) {
            return {name: userData[i].name, role : userData[i].role}
        }
    }
    return false
}

// After login function
const saveData = () => {
    event.preventDefault()

    if (!adminSession) {
        alert("Please log in as admin")
        return
    }

    const form = document.inputData
    let id, password, role, index;

    if (form.id.value) {
        const user = findById(userData, form.id.value)
        id = form.id.value
        password = user.password
        role = user.role
        index = userData.findIndex(data => data == findById(userData, id))
    } else {
        id = userData.length > 0 ? userData[userData.length -1].id + 1 : 0
        password = form.password.value
        role = "user"
        index = userData.length
    }

    const insertData = {
        id: id,
        name: form.name.value,
        password: password,
        address: form.address.value,
        dob : [form.pob.value, form.dob.value],
        gender: form.gender.value,
        hobby: getValueCheckbox("hobby"),
        position: form.position.value,
        role: role
    }
    
    userData.splice(index, 1, insertData)
    form.reset()
    let page = Math.floor(index / rowPerPage)
    showData(userData, page)
}

const getValueCheckbox = (checkboxName) => {
    const inputItem = document.querySelectorAll(`input[name="${checkboxName}"]:checked`)

    let items = []
    inputItem.forEach(item => items.push(item.value))
    return items
}

const setValueCheckbox = (name, checkboxValues) => {
    const box = document.querySelectorAll(`input[name="${name}"]`)
    box.forEach(checkbox => {
        checkbox.checked = checkboxValues.indexOf(checkbox.value) != -1 ? "checked" : ""
    })
}

const pageCorrector = (lastPage, page) => {
    // let lastPage = Math.ceil(data.length / rowPerPage)
    return page < 0 ? 0 : page > lastPage ? lastPage : page
}

const showData = (data, page = 0) => {
    const outputTable = document.querySelector(".outputData")

    let hidden = adminSession ? "" : "hidden"
    
    page = pageCorrector(Math.ceil(data.length / rowPerPage) - 1, page)

    let firstIndex = page * rowPerPage
    let lastIndex = Math.min(firstIndex + rowPerPage,data.length)

    let tr="";

    
    if (lastIndex <= 0) {
        outputTable.innerHTML = tr
        pagination(data, page)
        return
    }

    for(let i = firstIndex; i < lastIndex; i++){
        const user = data[i]
        tr += `
                <tr class="user-data">
                    <td>${i+1}</td>
                    <td>${user.name}</td>
                    <td>${user.dob[0]}, ${user.dob[1]}</td>
                    <td>${user.position}</td>
                    <td>${user.address}</td>
                    <td>${user.gender}</td>
                    <td>${user.hobby}</td>
                    <td align='center' class="action" ${hidden}>
                        <button class="update" name="updateData" onclick="updateData(${user.id})">Ubah</button>
                        <button class="delete" name="deleteData" onclick="deleteData(${user.id})">Hapus</button>
                    </td>
                </tr>`
    }
    outputTable.innerHTML = tr
    pagination(data, page)
}

const searchData = (word) => {
    let searchValue = new RegExp(word.value, "i");

    if (activeUser.role != "admin") {
        let nonAdminUser = userData.filter(data =>{return data.role != "admin"})
        filteredResult = nonAdminUser.filter(data =>{
            return searchValue.test(data.name) || searchValue.test(data.address)
        })
        showData(filteredResult)
        return
    }
    
    filteredResult = userData.filter(data =>{
        return searchValue.test(data.name) || searchValue.test(data.address)
    })
    showData(filteredResult)
}

const findById = (data, id) => {
    for (let i = 0; i < data.length; i++){
        if( data[i].id == id) {
            return data[i]
        }
    }
}

const mapUserToForm = (user) => {
    let form = document.inputData
    form.id.value = user.id
    form.name.value = user.name
    form.address.value = user.address
    form.pob.value = user.dob[0]
    form.dob.value = user.dob[1]
    form.gender.value = user.gender
    form.position.value = user.position
    setValueCheckbox("hobby", user.hobby)
}

const updateData = (id) => {
    if (!adminSession) {
        alert("Please log in as admin")
        return
    }
    const user = findById(userData, id)
    mapUserToForm(user)
}

const deleteData = (id) => {
    if (!adminSession) {
        alert("Please log in as admin")
        return
    }
    const user = findById(userData, id)
    let page = currentPage(userData, id)
    userData.splice(userData.indexOf(user),1)
    showData(userData, page)
}

const pagination = (data, _currentPage) => {

    const page = document.querySelector(".pagination")
    
    let numberOfPagination = 3
    let totalPage = Math.ceil(data.length/rowPerPage)
    
    let [startPage, lastPage] = pageNumberGenerator(totalPage, _currentPage, numberOfPagination)

    let div = ""
    let dataRef = data == userData ? "userData" : "filteredResult"

    if (_currentPage != 0) {
        div += `<button class="firstLastPage" onclick="showData(${dataRef}, page=${0})">First Page</button>`;
    }

    for (let i = startPage; i <= lastPage; i++) {
        let currentPageStyle = i == _currentPage ? "currentPage" : ""
        div += `<button class="pageNumber ${currentPageStyle}" onclick="showData(${dataRef}, page=${i})">${i+1}</button>`;
    }

    if (_currentPage < totalPage - 1) {
        div += `<button class="firstLastPage" onclick="showData(${dataRef}, page=${totalPage - 1})">Last Page</button>`;
    }

    page.innerHTML = div
}

const pageNumberGenerator = (totalPage, _currentPage, numOfPageToDisplay) => {
    // return index for pagination [i,j]
    // page start from i to j
    // numOfDisplayedPage is amount of displayed page number 

    let distanceFromCurrentPage = Math.floor(numOfPageToDisplay/2) // distance currentPage to startPage

    let startPage = // if in the fisrt page = 0, or totalPage <= numOfDisplayedPage 
        // or startPage = (_currentPage - distanceFromCurrentPage) < 0
        _currentPage == 0 || totalPage <= numOfPageToDisplay || _currentPage - distanceFromCurrentPage < 0 ?

        // return 0
        0 : // return 0, else

        // if the first page to display startPage = (page - distanceFromCurrentPage) and 
        // the last page to display = startPage + (numOfDisplayedPage - 1) > totalPage
        (_currentPage - distanceFromCurrentPage) + (numOfPageToDisplay - 1) > totalPage - 1 ?
        
        // return last_page_to_display - (numOfDisplayedPage - 1)
        totalPage - numOfPageToDisplay : 

        // else
        _currentPage - distanceFromCurrentPage

    let lastPage = // totalPage < numOfPageToDisplay
        totalPage < numOfPageToDisplay ? 
        totalPage - 1 : // return totalPage - 1
        // else startPage + numOfPageToDisplay
        startPage + numOfPageToDisplay - 1
        
    return [startPage, lastPage]
}


const currentPage = (data, id) => {
    let user = findById(data, id)
    let index = data.indexOf(user)
    return Math.floor(index / rowPerPage)
}

const inputUser = (id, name, password, address, dob, gender, hobby, position, role) => ({
    id, name, password, address, dob, gender, hobby, position, role});
userData.push(inputUser(0, "Admin", "admin", "Jakarta", ["Jakarta", "2020-01-01"], "Laki-Laki", ["Membaca", "Berenang"], "Manager", "admin"))
userData.push(inputUser(1, "Admin 2", "admin", "Bekasi", ["Jakarta", "2021-10-01"], "Laki-Laki", ["Membaca"], "Manager", "admin"))
userData.push(inputUser(2, "User 1", "user", "Depok", ["Jakarta", "2019-02-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(3, "User 2", "user", "Tangerang", ["Jakarta", "2018-07-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(4, "User 3", "user", "Bogor", ["Jakarta", "2019-07-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(5, "User 4", "user", "Jakarta", ["Jakarta", "2019-07-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(6, "User 5", "user", "Tangerang", ["Jakarta", "2019-05-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(7, "User 6", "user", "Jakarta", ["Jakarta", "2019-05-07"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(8, "User 7", "user", "Jakarta", ["Jakarta", "2019-12-21"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(9, "User 8", "user", "Jakarta", ["Jakarta", "2019-02-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(10, "User 9", "user", "Jakarta", ["Jakarta", "2019-07-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(11, "User 10", "user", "Jakarta", ["Jakarta", "2019-01-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(12, "User 11", "user", "Jakarta", ["Jakarta", "2019-05-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(13, "User 12", "user", "Jakarta", ["Jakarta", "2019-08-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(14, "User 13", "user", "Jakarta", ["Jakarta", "2019-09-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(15, "User 14", "user", "Jakarta", ["Jakarta", "2019-10-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(16, "User 15", "user", "Jakarta", ["Jakarta", "2019-11-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(17, "User 16", "user", "Jakarta", ["Jakarta", "2019-12-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(18, "User 17", "user", "Jakarta", ["Jakarta", "2019-01-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(19, "User 18", "user", "Jakarta", ["Jakarta", "2019-02-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(20, "User 19", "user", "Jakarta", ["Jakarta", "2019-03-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(21, "User 20", "user", "Jakarta", ["Jakarta", "2019-04-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(22, "User 21", "user", "Jakarta", ["Jakarta", "2019-05-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(23, "User 22", "user", "Jakarta", ["Jakarta", "2019-06-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(24, "User 23", "user", "Jakarta", ["Jakarta", "2019-07-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(25, "User 24", "user", "Jakarta", ["Jakarta", "2019-08-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(26, "User 25", "user", "Jakarta", ["Jakarta", "2019-09-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(27, "User 26", "user", "Jakarta", ["Jakarta", "2019-10-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(30, "User 27", "user", "Jakarta", ["Jakarta", "2019-11-01"], "Laki-Laki", ["Membaca"], "Staff", "user"))
userData.push(inputUser(31, "Ahmad", "ahmad", "Jakarta", ["Jakarta", "1998-10-31"], "Laki-Laki", ["Berenang"], "Engineer", "user"))
userData.push(inputUser(32, "Agus", "agus", "Jakarta", ["Jakarta", "2009-11-27"], "Laki-Laki", ["Membaca"], "Engineer", "user"))
userData.push(inputUser(33, "Bagus", "bagus", "Jakarta", ["Jakarta", "2003-04-17"], "Laki-Laki", ["Musik"], "Staff", "user"))

let filteredResult = [...userData]

module.exports = {
    findById,
    mapUserToForm,
    pageNumberGenerator,
    currentPage,
    pageCorrector,
    findUserByUsernameAndPassword,
    login,
    userData
}