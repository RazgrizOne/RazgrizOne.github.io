"use strict";

//Declared here so they are accessable.
var dataLayer;
var map;
var data;

//Max value of data: used in styling. Maybe the method should find this instead of saving it here.
var maxvalue = 510000;

//Target Data: MONTH
var currentdate = 1;

//Target Data: DATA names, mostly just for reference.
//If you append data to the JSON file it should have these names + the month.
//Talk to Andrew you are confused how the data should be formatted.
var TOP20 = "T_2016_";
var TOPPORTS = "PORTS_2016_";
var MEXCAN = "MEX_CAN_2016_";

//Target Data: DATA
var basedata = "T_2016_";

//Target Data: DATA + MONTH
var datastring = "T_2016_1";


//Input:  JSON feature  EX: json_data.features[i] or json_data.features["Country_name_here"]
//Output: target feature name
//Method: simply a way to save time.
//Dependancy: None
function getName(feature) {
    return feature.properties["name"];
}

//Input:  JSON feature  EX: json_data.features[i] or json_data.features["Country_name_here"]
//Output: target data value
//Method: simply a way to save time.
//Dependancy: Uses the global data target variable 'datastring'
function getData(feature) {
    return feature.properties[datastring];
    //return feature.properties["T_2016_1"]
}

function crossHighlight(event) {
    console.log(event)
}

//Input:  JSON feature  EX: json_data.features[i] or json_data.features["Country_name_here"]
//Output: Style list
//Method: sets the style of the drawn country based on the current target data.
//Dependancy: getData(), getCountryColor()
function calcStyle(feature) {
    var featureweight = 0;
    var featurecolor = "black";
    var opacity = 0;
    if (getData(feature) > 0) {
        featurecolor = "black";
        featureweight = 3;
        opacity = .5
    }

    return {
        fillColor: getCountryColor(getData(feature)),
        weight: featureweight,
        opacity: opacity,
        color: featurecolor,
        //dashArray: 3,
        fillOpacity: opacity
    }
}


//Input:  JSON feature, Leaflet Layer
//Output: VOID
//Method: assigns methods to different actions from actions.js
//Dependancy: highlightFeature(), resetHighlight(), zoomToFeature(), setStyle(), calcStyle()
function actionMethodList(feature, layer) {
    layer.on(
        {
            //mouseover: popup,
            //mouseout: removepopup,
            click: zoomToFeature
        }
    );
}

//Input:  value
//Output: CSS color
//Method: returns a color given a value.
//Dependancy: No custom code
function getCountryColor(number) {
    var tempnumber = number;
    if (number == 0) {
        return Color({
            b: 61,
            g: 60,
            r: 60
        }).toCSS();
    }

    if (number > maxvalue) {
        return Color({
            h: 240,
            s: 80,
            l: 50
        }).toCSS();
    }

    return Color({
        h: 240,
        s: (number / maxvalue) * 100,
        l: 50
    }).toCSS();
}



//Input:  None
//Output: None
//Method: This is the main method.
//Dependancy: Plenty
window.onload = function () {



    //set values for PC
    var minzoomlevel = 2;
    var bounds = ([
        //corner 1
        [90, -180],
        //corner 2
        [-60, 300]
    ]);

    //var height = $(window).height();
    //var width = $(window).width();
    //set values for smaller screens
    /*
    if ((height < 586 && width < 1095) || height < 325 || (width < 700 && height > 586)) {
        minzoomlevel = 1;
        bounds = ([
            //corner 1
            [90, -180],
            //corner 2
            [-60, 400]
        ])
    }
    */

    //Load the map layer.
    map = L.map('mapDiv', {
        center: [51.505, -0.09],
        zoom: 2,
        minZoom: minzoomlevel,
        //how to change the coordinate system
        //Won't change it for mapbox though.
        //crs: L.CRS.EPSG4326,

        //this limits how much the map can be panned
        maxBounds: bounds,
        maxBoundsViscosity: 1.0
    });

    //load data from JSON file
    data = L.geoJSON(
        json_data,
        {
            style: calcStyle,
            onEachFeature: actionMethodList
        }
    )

    

    //https://api.mapbox.com/styles/v1/amasw87/cjaal9d4k2kpi2snt65k9b7c8/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hc3c4NyIsImEiOiJjajZ6aG50bnUwMGpqMnBvOGJjNTk0cHFvIn0.IXHyLgImAw0H_dlCs7ZEgA
    //https://api.mapbox.com/styles/v1/amasw87/cjaffnvjx64um2rkan8pwg1to/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hc3c4NyIsImEiOiJjajZ6aG50bnUwMGpqMnBvOGJjNTk0cHFvIn0.IXHyLgImAw0H_dlCs7ZEgA
    L.tileLayer('https://api.mapbox.com/styles/v1/pieisgood4u/cjaoe7l96fex02spepf1p7pmj/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGllaXNnb29kNHUiLCJhIjoiY2o2emd1bWg4MDA4MDMzbXluNjBtem5lMiJ9.jIGkrUiDkQXfUl4EVruO1g', {
        maxZoom: 18,
        //continuousWorld: true,
        attribution: "&copy; <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
    }).addTo(map);


    //add JSON as its own layer in the map.
    map.addLayer(data);

    // Creates a red marker with the coffee icon
    /*
    var redMarker = L.AwesomeMarkers.icon({
        icon: 'coffee',
        markerColor: 'red'
    });

    var geojson = L.geoJson(json_data, {
        onEachFeature: function (feature, layer) {
            if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                console.log('Polygon detected');
                var centroid = turf.centroid(feature);
                var lon = centroid.geometry.coordinates[0];
                var lat = centroid.geometry.coordinates[1];
                L.marker([lat, lon], { icon: redMarker }).addTo(map);
            }
        }
    });
    */

    //geojson.addTo(map);

    //Load data for the graph and Create the graph.
    graphLoader()
    buildGraph()

    //Geodesic line test. Needs work.
    //###############################

/*
    for (i = 0; i < json_data.features.length; i++){
         
    }
    var Geodesic = L.geodesic([], {
        weight: 10,
        opacity: 1,
        color: 'blue',
        steps: 100   
    }).addTo(map);
    var berlin = new L.LatLng(52.5, 13.35);
    var losangeles = new L.LatLng(33.82, -118.38);
    Geodesic.setLatLngs([[berlin, losangeles]]);
    //################################
*/
}
    ;
