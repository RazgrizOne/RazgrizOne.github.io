//methods called by actions go here
//e stands for event

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

function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle(calcStyle(e.target.feature)
    );
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}