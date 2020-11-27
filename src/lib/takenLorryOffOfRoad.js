function takenLorryOffOfRoad(intelligentlyPackedBoxData, co2LorryAmount, maxBoxCo2Footprint) {
    return (maxCo2(intelligentlyPackedBoxData, maxBoxCo2Footprint) 
        - actualCo2(intelligentlyPackedBoxData) >= co2LorryAmount);
}

function maxCo2(intelligentlyPackedBoxData, maxBoxCo2Footprint) {
    return intelligentlyPackedBoxData.length * maxBoxCo2Footprint;
}

function actualCo2(intelligentlyPackedBoxData) {
    return intelligentlyPackedBoxData
        .reduce((acc, boxData) => acc + boxData.co2FootprintKg, 0)
}

module.exports = {
    actualCo2,
    takenLorryOffOfRoad
};