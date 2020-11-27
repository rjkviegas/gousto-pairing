const calculateBoxesVolumeMm3 = require('../lib/calculateBoxesVolumeMm3');
const selectSmallestBoxesRequired = require("./selectSmallestBoxesRequired");
const { takenLorryOffOfRoad } = require("./takenLorryOffOfRoad");
const co2LorryAmount = 1000;
const maxBoxCo2Footprint = 300;

function intelligentPacking(boxes, orders) {
    const result = {};
    const enrichedBoxes = calculateBoxesVolumeMm3(boxes)
    result.intelliPack = selectSmallestBoxesRequired(enrichedBoxes, orders);
    result.takenLorryOffOfRoad = 
        takenLorryOffOfRoad(result.intelliPack, co2LorryAmount, maxBoxCo2Footprint);
    return result;
}

module.exports = intelligentPacking;