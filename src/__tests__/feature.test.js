const { calculateActualCo2, calculateBoxes } = require("../lib/selectBox");

describe("Feature test", () => {
    const boxes = [
        {
            "id": "PK-MED-01",
            "name": "Medium",
            "dimensions": {
                "widthMm": 30,
                "heightMm": 50,
                "depthMm": 60
            },
            "co2FootprintKg": 200
        },
        // boxVolMm3 = 90000
        {
            "id": "PK-SML-02",
            "name": "Small",
            "dimensions": {
                "widthMm": 20,
                "heightMm": 80,
                "depthMm": 50
            },
            "co2FootprintKg": 100
        },
        // boxVolMm3 = 80000
        {
            "id": "PK-LRG-03",
            "name": "Large",
            "dimensions": {
                "widthMm": 20,
                "heightMm": 100,
                "depthMm": 50
          },
          "co2FootprintKg": 300
        }
        // boxVolMm3 = 100000
    ];

    const orders = [
        {
            "id": "1",
            "ingredients": [
                {
                "name": "radishes",
                "volumeCm3": 9
                },
                {
                "name": "aubergine",
                "volumeCm3": 18
                },
                {
                "name": "super pasta",
                "volumeCm3": 27
                },
                {
                "name": "honey",
                "volumeCm3": 7.2
                },
                {
                "name": "duck",
                "volumeCm3": 23
                }
          ]
        },
        // order volumeInMm3 = 84200
        {
          "id": "2",
          "ingredients": [
            {
              "name": "artichokes",
              "volumeCm3": 20
            },
            {
              "name": "haricots",
              "volumeCm3": 6.7
            },
            {
              "name": "noodles",
              "volumeCm3": 18
            },
            {
              "name": "broccoli",
              "volumeCm3": 27.9
            },
            {
              "name": "mayonnaise",
              "volumeCm3": 3
            }
          ]
        }
        // order volumeInMm3 = 75600
    ];
    
    describe("calculateActualCo2", () => {
        it("returns sum of orders Co2 footprint", () => {
            const orderBoxes = [
                {
                    orderId: "1",
                    boxId: "PK-MED-01",
                    co2FootprintKg: 200
                },
                {
                    orderId: "2",
                    boxId: "PK-SML-02",
                    co2FootprintKg: 100
                }
            ];
            expect(calculateActualCo2(orderBoxes)).toBe(300)
        })
    })
    
    describe("calculateBoxes", () => {
        it("returns array of object containing order ids and box ids", () => {
            expect(calculateBoxes(boxes, orders)).toEqual([
                {
                    orderId: "1",
                    boxId: "PK-MED-01",
                    co2FootprintKg: 200
                },
                {
                    orderId: "2",
                    boxId: "PK-SML-02",
                    co2FootprintKg: 100

                }
            ])
        })
    });
    
    // describe("selectBox", () => {
    //     it("returns a box big enough for an order", () => {
    //         const order = {
    //             "id": "1",
    //             "ingredients": [
    //                 {
    //                     "name": "radishes",
    //                     "volumeCm3": 9
    //                 },
    //                 {
    //                     "name": "aubergine",
    //                     "volumeCm3": 18
    //                 },
    //                 {
    //                     "name": "super pasta",
    //                     "volumeCm3": 27
    //                 },
    //                 {
    //                     "name": "honey",
    //                     "volumeCm3": 7.2
    //                 },
    //                 {
    //                     "name": "duck",
    //                     "volumeCm3": 23
    //                 }
    //             ]
    //           };
    //         // order volumeInMm3 = 84200

    //         expect(selectBox(boxes, order)).toEqual({
    //             orderId: "1",
    //             boxId: "PK-MED-01"
    //         });
    //     })
    // })
})