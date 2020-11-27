const { actualCo2 } = require('../lib/takenLorryOffOfRoad');

describe("actualCo2", () => {
    it("returns sum of orders Co2 footprint", () => {
        const intelligentlyPackedOrders = [
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
        expect(actualCo2(intelligentlyPackedOrders)).toBe(
            intelligentlyPackedOrders[0].co2FootprintKg
            + intelligentlyPackedOrders[1].co2FootprintKg
        );
    });
});