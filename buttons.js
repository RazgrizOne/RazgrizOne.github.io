//methods that will be put on buttons go here.

//change - INT: how many places to move in the data + or -
//
//changeData changes the current data target
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function changeDate(date){
    console.log("changeData was called")
    currentdate += date
    //checkEnableMinus(currentdate);
    //checkEnablePlus(currentdate);
    datastring = basedata + currentdate.toString();
    data.eachLayer(function (layer) { 
        layer.setStyle(calcStyle(layer.feature)) 
        });

    document.querySelector('.content').innerHTML = months[currentdate-1];
    buildGraph();
}

function checkEnableMinus(date){
    var btn = document.getElementById("minus");
    if (date < 1){
        btn.dissabled = true;
    }
    else {
        btn.dissabled = false;
    }
}

function checkEnablePlus(date){
    var btn = document.getElementById("plus");
    if (date > 12){
        btn.dissabled = true;
    }
    else{
        btn.dissabled = false;
    }
}

//type - String: the new base data type
//
//changeBaseData changes the data you are working with.
function changeBaseData(DataIdentifier){
    console.log("changeBaseData was called")
    data.eachLayer(function (layer) { 
        layer.setStyle(calcStyle(layer.feature)) 
        });
}