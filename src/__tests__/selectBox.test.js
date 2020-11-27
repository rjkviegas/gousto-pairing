const { selectBox, calcOrderVol } = require('../lib/selectBox');

describe("selectBox", () => {
    it("has a module", () => {
        expect(selectBox).toBeDefined();
    });

    it("outputs an object with the order id", () => {
        const boxes = [{}];
        const order = { id: 1 };
        const selectedBox = selectBox(boxes, order);

        expect(selectedBox.orderId).toBe(1);
    });

    it("outputs an object with the order id", () => {
        const boxes = [{ id: "PK-MED-01" }];
        const order = {};
        const selectedBox = selectBox(boxes, order);

        expect(selectedBox.boxId).toEqual("PK-MED-01");
    });
});

describe("calcOrderVol", () => {
    it("totals ingredients volume", () => {
        const order = {
            "id": "1",
            "ingredients": [
              {
                "name": "radishes",
                "volumeCm3": 9
              },
              {
                "name": "aubergine",
                "volumeCm3": 18
              }
            ]
        };

        expect(calcOrderVol(order)).toBe(27000)
    })
})