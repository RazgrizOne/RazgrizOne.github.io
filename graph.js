Chart.defaults.global.responsive = true
Chart.defaults.global.defaultColor = Color({h: 0, s: 80,l: 50}).toCSS();
Chart.defaults.global.defaultFontColor = 'red';

var chart

//I want to remember how to do this if it comes in handy
//datapoints.push({ year: getData(json_data.features[i]), value: getName(json_data.features[i]) })

//Input:  None
//Output: databank (package of data and labels which is used when drawing the graph)
//Method: loads target data into a package.
//Dependancy: Who knows :)
function graphLoader(){
    var datasets = []
    var data_data = []
    var labels = []

    for (i = 0; i < json_data.features.length; i++) {
        if(getData(json_data.features[i]) > 0 && getName(json_data.features[i]) != "Mexico" && getName(json_data.features[i]) != "Canada" )
        {
         data_data.push(getData(json_data.features[i]))
         labels.push(getName(json_data.features[i]))
        }
    } 

    var databank = {
        datasets: [{
            data: data_data,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }],
        labels: labels
    };

    return databank
}


//Input:  None
//Output: databank
//Method: build or rebuild a graph.
//Dependancy: Who knows :)
function buildGraph(){
    chart
    graphLoader()
    console.log(chart)
    if(chart != undefined){
        console.log("destroying chart")
        chart.destroy()
    }
    
    var ctx = document.getElementById('results-graph').getContext('2d');
    ctx.canvas.width = 300;
    ctx.canvas.height = 300;
    chart = new Chart(ctx, {
        // The type of chart we want to create
        // type: 'typehere',
        type: 'horizontalBar',
    
        // The data for our dataset
        // data: {[ data: [1,2,3] , labels: [me,you,them] ]}
        data: graphLoader(),
    
        // Configuration options go here
   
        //options:
            
    });
    
}