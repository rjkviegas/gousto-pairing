function takenLorryOffOfRoad(intelligentlyPackedBoxsData, co2LorryAmount, maxBoxCo2Footprint) {
    return (maxCo2(intelligentlyPackedBoxsData, maxBoxCo2Footprint) 
        - actualCo2(intelligentlyPackedBoxsData) >= co2LorryAmount);
}

function maxCo2(intelligentlyPackedBoxsData, maxBoxCo2Footprint) {
    return intelligentlyPackedBoxsData.length * maxBoxCo2Footprint;
}

function actualCo2(intelligentlyPackedBoxsData) {
    return intelligentlyPackedBoxsData
        .reduce((acc, boxData) => acc + boxData.co2FootprintKg, 0)
}

module.exports = {
    actualCo2,
    takenLorryOffOfRoad
};