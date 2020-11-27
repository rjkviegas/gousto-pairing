function selectBox(boxes, order) {

    const enrichedBoxes = boxes.map(enrichBox).sort((a, b) => a.totalVol - b.totalVol);

    const orderVol = calcOrderVol(order);

    const selectedBox = enrichedBoxes
        .filter(box => orderVol < box.totalVol)[0];
    


    const orderId = order.id;
    const boxId = selectedBox.id;
    return { 
        orderId,
        boxId
    };
}

function calcOrderVol(order) {
    let result = 0;
    order.ingredients.forEach(ingredient => {
        result += ingredient.volumeCm3
    })
    return result*1000;
}

function enrichBox(box) {
    const result = Object.assign( {}, box);
    result.totalVol = calcBoxVol(box);
    return result;

}

function calcBoxVol(box) {
    let result = 1;
    Object.keys(box.dimensions).forEach(dim => {
        result *= dim
    })
    return result;
}

module.exports = { 
    selectBox,
    calcOrderVol
};