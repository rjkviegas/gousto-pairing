function boxCalculator(boxes, orders) {
    return orders.map(selectBox)

    function selectBox(order) {
        const result = {};
        result.orderId = order["id"];
        const orderVolMm3 = calcOrderVol(order);
        result.boxId = boxes.map(enrichBox)
            .sort((a, b) => a.volMm3 - b.volMm3)
            .filter(box => orderVolMm3 < box.volMm3)[0].id
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
    boxCalculator
};