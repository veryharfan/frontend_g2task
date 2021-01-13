let parkingList=[]

const inputdata = (id, datetime, type, exitParking) => ({id, datetime, type, exitParking})

const convertInputDateTime = (datetime) => {
    let [date, time] = datetime.split("T")
    let [yyyy, mon, dd, hh, min] = [...date.split("-"), ...time.split(":")]
    return new Date(yyyy, conf(mon)-1, conf(dd), conf(hh), conf(min))
}

const conf = (str) => (str[0] == "0" ? str[1] : str)

const saveData = () => {
    event.preventDefault()

    let form = document.inputData
    console.log(form)
    let id = form.id.value
    let datetime = form.datetime.value == "" ? new Date() : convertInputDateTime(form.datetime.value)
    let type = form.type.value

    if (datetime > new Date()) {
        alert(`
        Please input Waktu Masuk Kendaraan less than Present Time
        or you can just left it blank
        `)
        return
    }


    let index = parkingList.indexOf( x => x.id == id) == -1 ? parkingList.length : parkingList.indexOf( x => x.id == id)

    parkingList.splice(index, 1, inputdata(id, datetime,type, false))

    form.reset()
}

const miliSecondsToMinutes = (x) => (Math.ceil(x/(1000*60)))

const generatePrice = (inDatetime, outDatetime, type) => {
    let minutesParking = miliSecondsToMinutes(outDatetime - inDatetime)
    return type == "motor" ? 2000 + (minutesParking - 1) * 1000 : 3000 + (minutesParking - 1) * 1500
}

const addComma = (n) => {
    let regex =  /(\d+)(\d{3})/;
    return String(n).replace(/^\d+/, function(x) {
        while(regex.test(x)){
            x = x.replace(regex, '$1,$2');
        }
        return x
    })
}

const exit = () => {
    event.preventDefault()

    let outDatetime = new Date()
    let id = document.outputData.outUser.value
    let user = parkingList.find(_user => _user.id == id)
    let receipt = document.querySelector(".receipt")
    let receiptBody = document.querySelector(".receipt-body")

    if (user.exitParking) {
        receiptBody.innerHTML = `
                        <div class="header receipt-header">Receipt</div>
                        <div class="receipt-label">Kendaraan ${user.id} sudah keluar parkir</div>
                        <button onclick="ok()">OK</button>`
        receipt.hidden = false
        document.outputData.reset()
        return
    }

    let price = generatePrice(user.datetime, outDatetime, user.type)

    user.outDatetime = outDatetime
    user.price = price

    let result = `<div class="header receipt-header">Receipt</div>
                  <div class="receipt-label">Start</div> <div class="colon">:</div> <div class="receipt-startTime">${user.datetime.toDateString()} ${user.datetime.toLocaleTimeString()}</div>
                  <div class="receipt-label">End</div> <div class="colon">:</div> <div class="receipt-endTime">${outDatetime.toDateString()} ${outDatetime.toLocaleTimeString()}</div>
                  <div class="receipt-label">Type</div> <div class="colon">:</div> <div class="receipt-type">${user.type} &nbsp; ${user.id}</div>
                  <div class="receipt-label">Price</div> <div class="colon">:</div> <div class="receipt-price">Rp ${addComma(price)}</div>
                  <div class="receipt-label">Continue?</div>
                  <button class="cancel" onclick="cancel('${user.id}')">Cancel</button> <button class="proceed" onclick="proceed('${user.id}')">Proceed</button>`

    receiptBody.innerHTML = result
    receipt.hidden = false
    document.outputData.reset()
}

const cancel = (id) => {
    let receiptBody = document.querySelector(".receipt-body")
    receiptBody.innerHTML = `
                    <div class="header receipt-header">Receipt</div>
                    <div class="receipt-label">Transaction with ${id} Canceled</div>
                    <button onclick="ok()">OK</button>
                    `
}

const proceed = (id) => {
    let receiptBody = document.querySelector(".receipt-body")
    let user = parkingList.find(_user => _user.id == id)
    user.exitParking = true

    receiptBody.innerHTML = `
                <div class="header receipt-header">Receipt</div>
                <div class="receipt-label">Transaction with ${id} Success</div>
                <button onclick="ok()">OK</button>
                `
}

const ok = () => {
    let receipt = document.querySelector(".receipt")
    let receiptBody = document.querySelector(".receipt-body")
    receiptBody.innerHTML = ""
    receipt.hidden = true
}

module.exports = {
    inputdata, 
    convertInputDateTime,
    addComma,
    miliSecondsToMinutes,
    generatePrice
}