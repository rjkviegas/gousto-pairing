const cm3ToMm3Multiplier = 1000;

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




module.exports = selectSmallestBoxesRequired;