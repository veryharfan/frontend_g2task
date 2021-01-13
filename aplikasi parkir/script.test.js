const MyModule = require("./script")
const inputdata = MyModule.inputdata
const convertInputDateTime = MyModule.convertInputDateTime
const addComma = MyModule.addComma
const miliSecondsToMinutes = MyModule.miliSecondsToMinutes
const generatePrice = MyModule.generatePrice

describe('input data to {id: id, datetime:datetime, type:type}', () => {
    it("should convert input to vehicle object", () => {
        let vehicle = inputdata("a123", [2021, 1, 27, 16, 12, 0], "motor")
        expect(vehicle.id).toBe("a123")
        expect(vehicle.datetime).toStrictEqual([2021, 1, 27, 16, 12, 0])
        expect(vehicle.type).toBe("motor")
    })
})

describe('convertInputDateTime', () => {
    it("should return object Date => January 27 2021 16:12:00", () => {
        let datetime = convertInputDateTime("2021-01-27T16:12")
        expect(datetime.getFullYear()).toBe(2021)
        expect(datetime.getMonth()).toBe(0)
        expect(datetime.getDate()).toBe(27)
        expect(datetime.getHours()).toBe(16)
        expect(datetime.getMinutes()).toBe(12)
        expect(datetime.getSeconds()).toBe(0)
    })
})

describe('addComma', () => {
    it("should give thousand separator", ()=> {
        expect(addComma(1000)).toBe("1,000")
        expect((addComma(123))).toBe("123")
        expect(addComma(123456789.789012)).toBe("123,456,789.789012")
    })
});

describe('miliSecondsToMinutes', () => {
    it('should convert miliseconds to minutes round to >= closest integer', () => {
        expect(miliSecondsToMinutes(1)).toBe(1)
        expect(miliSecondsToMinutes(1000)).toBe(1)    
        expect(miliSecondsToMinutes(60001)).toBe(2)    
    });
})

describe('generatePrice', () => {
    it('should return price 1 minutes motor', () => {
        expect(generatePrice(0,60000,"motor")).toBe(2000)
    });
    it('should return price 2 minutes motor', () => {
        expect(generatePrice(0,60001,"motor")).toBe(3000)
    });
    it('should return price 1 minutes car', () => {
        expect(generatePrice(0,60000,"mobil")).toBe(3000)
    });
    it('should return price 2 minutes car', () => {
        expect(generatePrice(0,70000,"mobil")).toBe(4500)
    });
});