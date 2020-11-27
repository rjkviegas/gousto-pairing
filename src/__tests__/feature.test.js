const selectSmallestBoxesRequired = require("../lib/selectBox");
const { takenLorryOffOfRoad } = require('../lib/takenLorryOffOfRoad');

describe("Feature test", () => {
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
                            "volumeCm3": (smallVolMm3/1000)-5
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
                        "volumeCm3": (mediumVolMm3/1000)-5
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
                        "volumeCm3": (largeVolMm3/1000)-5
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

    describe("takenLorryOffOfRoad", () => {
        it("returns true when more than CO2 Lorry Amount saved", () => {
            const co2LorryAmount = 1000;
            const maxBoxCo2Footprint = 300;
            const intelligentlyPackedBoxData = [
                {
                    co2FootprintKg: 10
                },
                {
                    co2FootprintKg: 10
                },
                {
                    co2FootprintKg: 10
                },
                {
                    co2FootprintKg: 10
                },
            ];

            expect(takenLorryOffOfRoad(intelligentlyPackedBoxData, co2LorryAmount, maxBoxCo2Footprint))
                .toBe(true);
        });

        it("returns false when less than CO2 Lorry Amount saved", () => {
            const co2LorryAmount = 1000;
            const maxBoxCo2Footprint = 300;
            const intelligentlyPackedBoxData = [
                {
                    co2FootprintKg: 200
                },
                {
                    co2FootprintKg: 200
                },
                {
                    co2FootprintKg: 200
                },
                {
                    co2FootprintKg: 200
                },
            ];

            expect(takenLorryOffOfRoad(intelligentlyPackedBoxData, co2LorryAmount, maxBoxCo2Footprint))
                .toBe(false);
        });
    });
});