const { calculateActualCo2,
        selectSmallestBoxesRequired,
        takenLorryOffOfRoad,
        calculateBoxesVolumeMm3
} = require("../lib/selectBox");
const boxes = require('../json/boxes.json');
const orders = require('../json/orders.json');

// console.log(selectSmallestBoxesRequired(boxes, orders))
// console.log(takenLorryOffOfRoad(selectSmallestBoxesRequired(boxes, orders)));

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

    describe("calculateBoxesVolumeMm3", () => {
        const boxes = [
            {
                "dimensions": {
                    "widthMm": 30,
                    "heightMm": 50,
                    "depthMm": 60
                }
            }
        ];
        it("returns array of box objects with volume property", () => {
            expect(calculateBoxesVolumeMm3(boxes)[0].volMm3).toBe(
                boxes[0].dimensions.widthMm * boxes[0].dimensions.heightMm * boxes[0].dimensions.depthMm
            );
        })
    })
    
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
            expect(calculateActualCo2(orderBoxes)).toBe(
                orderBoxes[0].co2FootprintKg + orderBoxes[1].co2FootprintKg
            );
        })
    })
    
    describe("selectSmallestBoxesRequired", () => {
        const smallVolMm3 = 80000;
        const mediumVolMm3 = 90000;
        const largeVolMm3 = 100000;

        const boxesWithVolumesMm3 = [
            {
                "id": "PK-SML-02",
                "volMm3": smallVolMm3,
            },
            {
                "id": "PK-MED-01",
                "volMm3": mediumVolMm3,
            },
            {
                "id": "PK-LRG-03",
                "volMm3": largeVolMm3,
            }
        ];
        it("returns small sized box id", () => {
            const orderNeedingSmallBox = [
                {
                    "id": "2",
                    "ingredients": [
                    {
                        "name": "artichokes",
                        "volumeCm3": 70
                    }
                    ]
                }
            ];
            const optimalBoxesForOrders = 
                selectSmallestBoxesRequired(boxesWithVolumesMm3, orderNeedingSmallBox);
            
            expect(optimalBoxesForOrders[0].orderId).toEqual(orderNeedingSmallBox[0].id);
            expect(optimalBoxesForOrders[0].boxId).toEqual(boxesWithVolumesMm3[0].id);
        });

        it("returns medium sized box id", () => {
            const orderNeedingMediumBox = [
                {
                    "id": "1",
                    "ingredients": [
                        {
                        "name": "radishes",
                        "volumeCm3": 85
                        }
                  ]
                }
            ];
            const optimalBoxesForOrders = 
                selectSmallestBoxesRequired(boxesWithVolumesMm3, orderNeedingMediumBox);

            expect(optimalBoxesForOrders[0].orderId).toEqual(orderNeedingMediumBox[0].id);
            expect(optimalBoxesForOrders[0].boxId).toEqual(boxesWithVolumesMm3[1].id);
        });

        it("returns large sized box id", () => {
            const orderNeedingLargeBox = [
                {
                    "id": "1",
                    "ingredients": [
                        {
                        "name": "chocolate cake",
                        "volumeCm3": 95
                        }
                  ]
                }
            ];
            const optimalBoxesForOrders = 
                selectSmallestBoxesRequired(boxesWithVolumesMm3, orderNeedingLargeBox);

            expect(optimalBoxesForOrders[0].orderId).toEqual(orderNeedingLargeBox[0].id);
            expect(optimalBoxesForOrders[0].boxId).toEqual(boxesWithVolumesMm3[2].id);
        });
    });
});