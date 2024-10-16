let msg = "Hello World!"

function outputError(msg) {
    let obj = document.getElementById("results");
    obj.innerHTML = msg;
}

function calcMPG(){
    let miles = parseFloat(document.getElementById("miles").value);
    let gallons = parseFloat(document.getElementById("gallons").value);
    if (isNaN(miles) || isNaN(gallons)){
        msg = "Error Mile or Gallons NaN"
        outputError(msg)
    }
    else if (miles < 0 || gallons < 0)
    {
        msg = "error miles or gallons < 0"
        outputError(msg);
    }
    else {
        let mpg =  miles / gallons;

        showValues(miles, gallons, mpg);
    }
}

function showValues(miles, gallons, mpg) {
    let obj = document.getElementById("results");
    obj.innerHTML = `Mile: ${miles} Gallons: ${gallons} MPG: ${mpg}`;
}