function calculateCo2(orderBoxObjs) {
    let result = 0;
    orderBoxObjs.forEach(box => {
        result += box.co2FootprintKg;
    })
    return result;
}

function calculateBoxes(boxes, orders) {
    return orders.map(selectBox)

    function selectBox(order) {
        const result = {};
        result.orderId = order["id"];
        const orderVolMm3 = calcOrderVol(order);
        result.boxId = boxes.map(enrichBox)
            .sort((a, b) => a.volMm3 - b.volMm3)
            .filter(box => orderVolMm3 < box.volMm3)[0].id;
        result.co2FootprintKg = boxes.map(enrichBox)
            .sort((a, b) => a.volMm3 - b.volMm3)
            .filter(box => orderVolMm3 < box.volMm3)[0]["co2FootprintKg"];
        return result;
    
        function calcOrderVol(order) {
            let result = 0;
            order.ingredients.forEach(ingredient => {
                result += ingredient.volumeCm3;
            });
            return result*1000;
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