"use strict";

//these must be declared here so they can be used by the functions
var dataLayer;
var map;
var maxvalue = 320000;

function TOURISTS(feature){
    return feature.properties["T_2016_01"]
}

//how style is determined when mousing over a feature
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle(
        {
            weight: 1,
            color: 'black',
            fillColor: 'white',
            fillOpacity: 0.2
        }
    );
    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

//how the style is determined by the data within the dataLayer
function calcStyle(feature) {
    var featureweight = 0;
    var featurecolor = "white";
    if (TOURISTS(feature) > 0) {
        featurecolor = "black";
        featureweight = 1;
    }

    return {
        fillColor: getCountryColor(TOURISTS(feature)),
        weight: featureweight,
        opacity: 1,
        color: featurecolor,
        //dashArray: 3,
        fillOpacity: 0.7
    }
}

//how the system handles resetting the highlight
function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle(calcStyle(e.target.feature)
    );
}

//how zooming when clicked is handled
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//assigns methods to different actions
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

    return Color({
        h: 360,
        s: number / maxvalue * 100,
        v: 60 + (number/maxvalue*25)
    }).toCSS();
}



//this is where the code is actually run
window.onload = function () {

    //creating the variable that IS the map
    map = L.map('mapDivId', {
        center: [51.505, -0.09],
        zoom: 1
    });

    //this is the map data
    //just call data.feature. etc... to dig into it.
    var data = L.geoJSON(
        json_data,
        {
            style: calcStyle,
            onEachFeature: actionMethodList
        }
    )



    buildLegend();

    //this is where the data from the shape file turned geojson file
    //gets inserted into the map as a layer.
    //all of the tables and vectors are in tact and can be accessed.
    map.addLayer(data);


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