function calculateBoxesVolumeMm3(boxes) {
    return boxes.map(enrichBox);

    function enrichBox(box) {
        const result = Object.assign({}, box);
        result.volMm3 = calcBoxVolMm3(box);
        return result
    }

    function calcBoxVolMm3(box) {
        return Object.keys(box.dimensions)
            .reduce((acc, dimensionName) => acc * box.dimensions[dimensionName], 1)
    }
}

module.exports = calculateBoxesVolumeMm3;