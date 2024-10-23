let myList = []
function addItem(){
    let item = document.getElementById("item").value
    if(item == null){
        alert("Please enter a valid item")
    }
    else {
        myList.push(item)
    }
    document.getElementById("results").innerHTML = "Added size = " + myList.length;
}

function removeFromList(){
    let item = document.getElementById("item").value
    let idx = myList.indexOf(item); // get item
    if (idx > -1){
        myList.splice(idx, 1);
    }
}

function showList(){
    let oStr = "<h2>Operation Results</h2>"
    oStr += "<ol>"
    for (let i = 0; i < myList.length; i++) {
        oStr += `<li>${myList[i]}</li>`;
    }
    oStr += "</ol>"
    document.getElementById("results").innerHTML = oStr;
}