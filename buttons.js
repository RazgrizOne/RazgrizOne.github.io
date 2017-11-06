//methods that will be put on buttons go here.

//change - INT: how many places to move in the data + or -
//
//changeData changes the current data target
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function changeDate(date){
    console.log("changeData was called")
    currentdate += date
    datastring = basedata + currentdate.toString();
    data.eachLayer(function (layer) { 
        layer.setStyle(calcStyle(layer.feature)) 
        });

    document.querySelector('.content').innerHTML = months[currentdate-1];
    buildGraph();
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