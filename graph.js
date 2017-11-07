var chart
var datapoints
var countrynames
var months
//might delete this
var databank
//use for datasets:
var datasets
//use for data:
var data_data
//use for labels:
var labels

var chart

var ctx

Chart.defaults.global.responsive = true


//I want to remember how to do this if it comes in handy
//datapoints.push({ year: getData(json_data.features[i]), value: getName(json_data.features[i]) })

function graphLoader(){
   // console.log(getData(json_data.features[0]))
    datasets = []
    data_data = []
    labels = []

    for (i = 0; i < json_data.features.length; i++) {
        if(getData(json_data.features[i]) > 0 && getName(json_data.features[i]) != "Mexico" && getName(json_data.features[i]) != "Canada" )
        {
         data_data.push(getData(json_data.features[i]))
         labels.push(getName(json_data.features[i]))
        }
    } 

    databank = {
        datasets: [{
            data: data_data
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: labels
    };
}

function buildGraph(){

    graphLoader()
    console.log(chart)
    if(chart != undefined){
        console.log("destroying chart")
        chart.destroy()
    }
    
    ctx = document.getElementById('results-graph').getContext('2d');
    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'polarArea',
    
        // The data for our dataset
        data: databank
    
        // Configuration options go here
        //options: options
    });
    
}