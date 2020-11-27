const calculateBoxesVolumeMm3 = require('../lib/calculateBoxesVolumeMm3');

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
            boxes[0].dimensions.widthMm
            * boxes[0].dimensions.heightMm
            * boxes[0].dimensions.depthMm
        );
    })
})