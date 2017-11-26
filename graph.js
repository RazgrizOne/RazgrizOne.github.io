Chart.defaults.global.responsive = true
Chart.defaults.global.defaultColor = Color({h: 0, s: 80,l: 50}).toCSS();
Chart.defaults.global.defaultFontColor = 'red';
Chart.defaults.global.legend.display = false;

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
                'rgba(230, 25, 75, 1)',
                'rgba(60, 180, 75, 1)',
                'rgba(255, 225, 25, 1)',
                'rgba(0, 130, 200, 1)',
                'rgba(245, 130, 48, 1)',	
                'rgba(145, 30, 180, 1)',
                'rgba(70, 240, 240, 1)',
                'rgba(240, 50, 230, 1)',	
                'rgba(210, 245, 60, 1)',
                'rgba(250, 190, 190, 1)',	
                'rgba(0, 128, 128, 1)',	
                'rgba(230, 190, 255, 1)',	
                'rgba(170, 110, 40, 1)',
                'rgba(255, 250, 200, 1)',	
                'rgba(128, 0, 0, 1)',
                'rgba(170, 255, 195, 1)',
                'rgba(128, 128, 0, 1)',	
                'rgba(255, 215, 180, 1)',	
                'rgba(0, 0, 128, 1)',	
                'rgba(128, 128, 128, 1)',	
                'rgba(255, 255, 255, 1)',	
                'rgba(0, 0, 0, 1)'
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
   
        options: {
            legend: {
               labels: {
                  fontColor: 'white' //set your desired color
               }
            }
         }
            
    });
    
}