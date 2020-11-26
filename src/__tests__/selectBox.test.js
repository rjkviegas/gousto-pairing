const selectBox = require('../lib/selectBox');

describe("selectBox", () => {
    it("has a module", () => {
        expect(selectBox).toBeDefined();
    });

    it("outputs an object with the order id", () => {
        const boxes = [{}];
        const order = { id: 1 };
        const selectedBox = selectBox(boxes, order);

        expect(selectedBox.id).toBe(1);
    });
});