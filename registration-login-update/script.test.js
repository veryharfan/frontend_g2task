const { expect, describe, it } = require("@jest/globals")
const MyModule = require("./script")
const findById = MyModule.findById
const pageNumberGenerator = MyModule.pageNumberGenerator
const pageCorrector = MyModule.pageCorrector
let userData = MyModule.userData

describe("findById", () => {
    it("find user with id=index", () => {
        expect(findById(userData, 1)).toBe(userData[1]);
    });
    it("find user with id != index", () => {
        expect(findById(userData, 30)).toBe(userData[28]);
    })
})

describe("pageNumberGenerator(totalPage=6 [0,1,2,3,4,5], page, numOfDisplayedPage=3)", () => {
    let pageIndex;
    it('should return [0,2], page=0', () => {
        pageIndex = pageNumberGenerator(6, 0, 3)
        expect(pageIndex[0]).toBe(0);
        expect(pageIndex[1]).toBe(2);
    });
    it("should return [0,2], page=1", () => {
        pageIndex = pageNumberGenerator(6, 1, 3)
        expect(pageIndex[0]).toBe(0);
        expect(pageIndex[1]).toBe(2);
    });
    it('should return [3,5], page=4', () => {
        pageIndex = pageNumberGenerator(6, 4, 3)
        expect(pageIndex[0]).toBe(3);
        expect(pageIndex[1]).toBe(5);
    });
    it("should return [3,5], page=5", () => {
        pageIndex = pageNumberGenerator(6, 5, 3)
        expect(pageIndex[0]).toBe(3);
        expect(pageIndex[1]).toBe(5);
    });
    it("should return [0,1], page=0 totalPage[0,1] < numOfDisplayedPage", () => {
        pageIndex = pageNumberGenerator(2, 0, 3)
        expect(pageIndex[0]).toBe(0);
        expect(pageIndex[1]).toBe(1);
    });
    it("should return [0,1], page=1 totalPage[0,1] < numOfDisplayedPage", () => {
        pageIndex = pageNumberGenerator(2, 1, 3)
        expect(pageIndex[0]).toBe(0);
        expect(pageIndex[1]).toBe(1);
    });
})

describe("pageNumberGenerator(totalPage=6[0,1,2,3,4,5], page, numOfDisplayedPage=4)", () => {
    let pageIndex;
    it('should return [0,3], page=0', () => {
        pageIndex = pageNumberGenerator(6, 0, 4)
        expect(pageIndex[0]).toBe(0);
        expect(pageIndex[1]).toBe(3);
    });
    it("should return [0,3], page=1", () => {
        pageIndex = pageNumberGenerator(6, 1, 4)
        expect(pageIndex[0]).toBe(0);
        expect(pageIndex[1]).toBe(3);
    });
    it('should return [0,3], page=2', () => {
        pageIndex = pageNumberGenerator(6, 2, 4)
        expect(pageIndex[0]).toBe(0);
        expect(pageIndex[1]).toBe(3);
    });
    it('should return [2,5], page=4', () => {
        pageIndex = pageNumberGenerator(6, 4, 4)
        expect(pageIndex[0]).toBe(2);
        expect(pageIndex[1]).toBe(5);
    });
    it("should return [2,5], page=5", () => {
        pageIndex = pageNumberGenerator(6, 5, 4)
        expect(pageIndex[0]).toBe(2);
        expect(pageIndex[1]).toBe(5);
    });
    it("should return [0,1], page=0 totalPage < numOfDisplayedPage", () => {
        pageIndex = pageNumberGenerator(2, 0, 4)
        expect(pageIndex[0]).toBe(0);
        expect(pageIndex[1]).toBe(1);
    });
    it("should return [0,1], page=1 totalPage < numOfDisplayedPage", () => {
        pageIndex = pageNumberGenerator(2, 1, 4)
        expect(pageIndex[0]).toBe(0);
        expect(pageIndex[1]).toBe(1);
    });
})

describe("pageCorrector(lastPage, page)", () => {
    it('should return page = 0 where page = 0', () => {
        expect(pageCorrector(6, 0)).toBe(0)
    });
    it('should return page = 6 where page = 6', () => {
        expect(pageCorrector(6, 6)).toBe(6)
    });
    it('should return page = 0 where page = -1', () => {
        expect(pageCorrector(6, -1)).toBe(0)
    });
    it('should return page = 6 where page > 6', () => {
        expect(pageCorrector(6, 7)).toBe(6)
    });
})