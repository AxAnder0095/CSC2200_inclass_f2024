const destinations = ["Aurora", "Dallas", "Detroit", "Milwaukee", "Peoria"];
const distanceInMiles = [42, 902, 230, 92, 172]; // distance in miles
const costsPerMile = [1.5, 1.2, 1.8, 2.0, 1.3]; // costs per mile

// Multiplier 1.0 goes with 0-10 lbs, 1.5 goes with 11-20 lbs and so on
const weightMultipliers = [1.0, 1.5, 2.0, 2.5, 3.0];
const weights = ["0-10 lbs", "11-20 lbs", "21-30 lbs", "31-40 lbs", "41 lbs and above"];

function loadDestinations(){
    let oStr = "";
    for (let i = 0; i < destinations.length; i++){
        oStr += `<option>${destinations[i]}</option>`;
    }
    document.getElementById("destination").innerHTML = oStr;
}

function loadWeights(){
    let oStr = "";
    for (let i = 0; i < weights.length; i++){
        oStr += `<option>${weights[i]}</option>`;
    }
    document.getElementById("weight").innerHTML = oStr;
}

function getDistance(dest){
    let idx = destinations.indexOf(dest);
    let distance = distanceInMiles[idx]
    let cost = costsPerMile[idx]

    return distance * cost
}

function getWeightCost(weight){
    let idx = weights.indexOf(weight)
    return weightMultipliers[idx]
}

function calculateCost(){
    let dest = document.getElementById("destination").value;
    let weight = document.getElementById("weight").value;

    let oStr = ""
    let distanceCost = getDistance(dest);
    let weightCost = getWeightCost(weight);
    let totalCost = distanceCost * weightCost;

    oStr = `Destination: ${dest} - Total Cost: $${totalCost.toFixed(2)}`
    document.getElementById("results").innerHTML = oStr;
}

function resetAll(){
    loadDestinations();
    loadWeights();
    document.getElementById("results").innerHTML = "";
}

window.onload = function (){
    loadDestinations();
    loadWeights();

    const calcButton = document.querySelector(".calcButton");
    calcButton.addEventListener("click", calculateCost);

    const resetButton = document.querySelector(".resetButton");
    resetButton.addEventListener("click", resetAll)
}
