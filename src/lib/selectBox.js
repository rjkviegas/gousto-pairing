function calculateCo2(orderBoxes) {
    return orderBoxes.reduce((acc, orderBox) => acc + orderBox.co2FootprintKg, 0)
}

function calculateBoxes(boxes, orders) {
    return orders.map(selectBox)

    function selectBox(order) {
        const result = {};
        result.orderId = order["id"];
        const orderVolMm3 = calcOrderVol(order);
        const adequatelySizedBox = boxes.map(enrichBox)
            .sort((a, b) => a.volMm3 - b.volMm3)
            .filter(box => orderVolMm3 < box.volMm3)[0]
        result.boxId = adequatelySizedBox.id;
        result.co2FootprintKg = adequatelySizedBox["co2FootprintKg"];
        return result;
    
        function calcOrderVol(order) {
            return order.ingredients
                .reduce((acc, ingredient) => acc + ingredient.volumeCm3, 0) * 1000;
        }
    
        function enrichBox(box) {
            const result = Object.assign({}, box);
            result.volMm3 = calcBoxVol(box);
            return result
        }
    
        function calcBoxVol(box) {
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
    calculateCo2
};