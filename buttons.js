//methods that will be put on buttons go here.

//change - INT: how many places to move in the data + or -
//
//changeData changes the current data target
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function changeDate(date) {
    console.log(currentdate);
    currentdate += date;

//prevent undifined date
    if (currentdate > 12) {
        currentdate -= 1;
        return;
    }

    if (currentdate < 1) {
        currentdate += 1;

        //alert("invalid month");
        return;
    }
    console.log("changeData was called")

    datastring = basedata + currentdate.toString();
    data.eachLayer(function (layer) {
        layer.setStyle(calcStyle(layer.feature))
    });

    document.querySelector('.content').innerHTML = months[currentdate - 1];
    buildGraph();
}

//type - String: the new base data type
//
//changeBaseData changes the data you are working with.
function changeBaseData(basestring) {
    console.log("changeBaseData was called:   " + basestring)
    basedata = basestring
    //reset graph and map. Need a method for reset all
    data.eachLayer(function (layer) {
        layer.setStyle(calcStyle(layer.feature))
    });
}