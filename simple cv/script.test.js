const MyModule = require("./script")
const dobFormatter = MyModule.dobFormatter

describe('dobFormatter convert date numeric string yyyy-mm-dd to dd MonthName yyyy', () => {
    it('should change ["2020", "01", "01"] to 01 January 2020', () => {
        expect(dobFormatter(["2020", "01", "01"])).toBe("01 January 2020")
    })
    it('should change ["2020", "07", "27"] to 27 July 2020', () => {
        expect(dobFormatter(["2020", "07", "27"])).toBe("27 July 2020")
    })
    it('should change ["2020", "12", "31"] to 01 January 2020', () => {
        expect(dobFormatter(["2020", "12", "31"])).toBe("31 December 2020")
    })
    
})
