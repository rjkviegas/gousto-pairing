function takenLorryOffOfRoad(orderBoxes) {
    return (calculateMaxCo2(orderBoxes) - calculateActualCo2(orderBoxes) >= 1000);
}

function calculateActualCo2(orderBoxes) {
    return orderBoxes.reduce((acc, orderBox) => acc + orderBox.co2FootprintKg, 0)
}

function calculateMaxCo2(orderBoxes) {
    return orderBoxes.length * 300;
}

function calculateBoxes(boxes, orders) {
    return orders.map(selectBox)

    function selectBox(order) {
        const result = {};
        result.orderId = order["id"];
        const orderVolMm3 = calcOrderVolMm3(order);
        const firstAdequateBox = enrichBoxes(boxes)
            .filter(box => orderVolMm3 < box.volMm3)[0]
        result.boxId = firstAdequateBox.id;
        result.co2FootprintKg = firstAdequateBox["co2FootprintKg"];
        return result;
    
        function calcOrderVolMm3(order) {
            return order.ingredients
                .reduce((acc, ingredient) => acc + ingredient.volumeCm3, 0) * 1000;
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