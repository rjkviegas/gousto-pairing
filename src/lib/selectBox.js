const maxBoxCo2Footprint = 300;
const co2LorryAmount = 1000;
const cm3ToMm3Multiplier = 1000;

function takenLorryOffOfRoad(orderBoxes) {
    return (calculateMaxCo2(orderBoxes) - calculateActualCo2(orderBoxes) >= co2LorryAmount);
}

function calculateActualCo2(orderBoxes) {
    return orderBoxes.reduce((acc, orderBox) => acc + orderBox.co2FootprintKg, 0)
}

function calculateMaxCo2(orderBoxes) {
    return orderBoxes.length * maxBoxCo2Footprint;
}

function calculateBoxesVolumeMm3(boxes) {
    return boxes.map(enrichBox);

    function enrichBox(box) {
        const result = Object.assign({}, box);
        result.volMm3 = calcBoxVolMm3(box);
        return result
    }

    function calcBoxVolMm3(box) {
        return Object.keys(box.dimensions)
            .reduce((acc, dim) => acc * box.dimensions[dim], 1)
    }
}

function selectSmallestBoxesRequired(boxes, orders) {
    return orders.map(selectSmallestPossibleBox)

    function selectSmallestPossibleBox(order) {
        const result = {};
        result.orderId = order.id;
        const orderVolMm3 = calcOrderVolMm3(order);
        const firstAdequateBox = boxes
            .sort((a, b) => a.volMm3 - b.volMm3)
            .find(box => orderVolMm3 < box.volMm3);
        result.boxId = firstAdequateBox.id;
        result.co2FootprintKg = firstAdequateBox.co2FootprintKg;
        return result;
    
        function calcOrderVolMm3(order) {
            return order.ingredients
                .reduce((acc, ingredient) => acc + ingredient.volumeCm3, 0) * cm3ToMm3Multiplier;
        }
    }
};



module.exports = {
    selectSmallestBoxesRequired,
    calculateActualCo2,
    takenLorryOffOfRoad,
    calculateBoxesVolumeMm3
};