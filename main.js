"use strict";

//these must be declared here so they can be used by the functions
var dataLayer;
var map;
var data;

//the max value of the data
//for use in certain styling methods
var maxvalue = 320000;

//the current number of the data in use
var currentdate = 1;

//Base names of data types without dates.
var TOP20 = "T_2016_";
var TOPPORTS = "PORTS_2016_";
var MEXCAN = "MEX_CAN_2016_";

//current target data frame. set by changeBaseData()
var basedata = "T_2016_";

//this contains the target data for methods
var datastring = "T_2016_1";


function getName(feature){
    return feature.properties["name"];
}

function getData(feature){
    return feature.properties[datastring];
    //return feature.properties["T_2016_1"]
}

//how style is determined when mousing over a feature


//how the style is determined by the data within the dataLayer
function calcStyle(feature) {
    var featureweight = .25;
    var featurecolor = "black";
    if (getData(feature) > 0) {
        featurecolor = "black";
        featureweight = 1.5;
    }

    return {
        fillColor: getCountryColor(getData(feature)),
        weight: featureweight,
        opacity: 1,
        color: featurecolor,
        //dashArray: 3,
        fillOpacity: 0.7
    }
}

//assigns methods to different actions from actions.js
function actionMethodList(feature, layer) {
    layer.on(
        {
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        }
    );
}

function buildLegend(){
    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (mapObject) {
        var div = L.DomUtil.create('div', 'legend');
        var labels = [
            "Incoming = 1600000",
            "________ = 1066666",
            "________ = 533333"
        ];
        var grades = [maxvalue, maxvalue/3*2, maxvalue/3];
        div.innerHTML = '<div><b><Legend</b></div>';
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background:'
                + getCountryColor(grades[i]) + '">&nbsp;&nbsp;</i>&nbsp;&nbsp;'
                + labels[i] + '<br/>';
        }
        return div;
    }
    legend.addTo(map);
}

//used to find what color a country should be
//this will likely eventually get its own js file
//needs to be way more complex
//that or we will find something else that already exists that will do its job.
function getCountryColor(number) {
    var tempnumber = number;
    if (number == 0){
        return Color({
            b:61,
            g:60,
            r:60
        }).toCSS();
    }
    return Color({
        h: 360,
        s: number / maxvalue * 100,
        v: 60 + (number/maxvalue*25)
    }).toCSS();
}



//this is where the code is actually run
window.onload = function () {

    //creating the variable that IS the map
    map = L.map('mapDiv', {
        center: [51.505, -0.09],
        zoom: 1
    });

    //this is the map data
    //just call data.feature. etc... to dig into it.
    data = L.geoJSON(
        json_data,
        {
            style: calcStyle,
            onEachFeature: actionMethodList
        }
    )

    //buildLegend();

    //console.log(getData(json_data.features[0]))
    //this is where the data from the shape file turned geojson file
    //gets inserted into the map as a layer.
    //all of the tables and vectors are in tact and can be accessed.
    map.addLayer(data);

    graphLoader()
    buildGraph()

/*
    var Geodesic = L.geodesic([], {
        weight: 7, 
        opacity: 0.5,
        color: 'blue',
        steps: 50
    }).addTo(map);


    var berlin = new L.LatLng(52.5, 13.35); 
    var losangeles = new L.LatLng(33.82, -118.38);
    
    Geodesic.setLatLngs([[berlin, losangeles]]);
    */
};