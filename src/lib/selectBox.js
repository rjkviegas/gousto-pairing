const maxBoxCo2Footprint = 300;
const co2LorryAmount = 1000;
const Cm3ToMm3Multiplier = 1000;

function takenLorryOffOfRoad(orderBoxes) {
    return (calculateMaxCo2(orderBoxes) - calculateActualCo2(orderBoxes) >= co2LorryAmount);
}

function calculateActualCo2(orderBoxes) {
    return orderBoxes.reduce((acc, orderBox) => acc + orderBox.co2FootprintKg, 0)
}

function calculateMaxCo2(orderBoxes) {
    return orderBoxes.length * maxBoxCo2Footprint;
}

function calculateBoxes(boxes, orders) {
    return orders.map(selectBox)

    function selectBox(order) {
        const result = {};
        result.orderId = order["id"];
        const orderVolMm3 = calcOrderVolMm3(order);
        const firstAdequateBox = enrichBoxes(boxes)
            .find(box => orderVolMm3 < box.volMm3)
        result.boxId = firstAdequateBox.id;
        result.co2FootprintKg = firstAdequateBox["co2FootprintKg"];
        return result;
    
        function calcOrderVolMm3(order) {
            return order.ingredients
                .reduce((acc, ingredient) => acc + ingredient.volumeCm3, 0) * Cm3ToMm3Multiplier;
        }

        function enrichBoxes(boxes) {
            return boxes.map(enrichBox).sort((a, b) => a.volMm3 - b.volMm3)
        }
    
        function enrichBox(box) {
            const result = Object.assign({}, box);
            result.volMm3 = calcBoxVolMm3(box);
            return result
        }
    
        function calcBoxVolMm3(box) {
            let result = 1;
            for (const dim in box.dimensions) {
                result *= box.dimensions[dim];
            }
            return result;
        }
    }
};



module.exports = {
    calculateBoxes,
    calculateActualCo2,
    takenLorryOffOfRoad
};