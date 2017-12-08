Chart.defaults.global.responsive = true
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.legend.display = false;
Chart.defaults.global.barPercentage = 1;
Chart.defaults.global.barThickness = 2;

var chart


function sortData(Countries, data, color) {
   
    var list = [];
    for (var j = 0; j < Countries.length; j++)
        list.push({ 'name': Countries[j], 'value': data[j], 'color': color[j] });

    list.sort(function (a, b) {
        return ((a.value < b.value) ? -1 : ((a.value == b.value) ? 0 : 1));
    });

    return list
}



//I want to remember how to do this if it comes in handy
//datapoints.push({ year: getData(json_data.features[i]), value: getName(json_data.features[i]) })

//Input:  None
//Output: databank (package of data and labels which is used when drawing the graph)
//Method: loads target data into a package.
function graphLoader() {
    var datasets = []
    var data_data = []
    var labels = []
    var bgcolor = []
    var list = []

    for (i = 0; i < json_data.features.length; i++) {
        //if(getRelevant(json_data.features[i]) && getName(json_data.features[i]) != "Mexico" && getName(json_data.features[i]) != "Canada" )
        if (getData(json_data.features[i]) > 0) {
            labels.push(getName(json_data.features[i]))
            data_data.push(getData(json_data.features[i]))
            bgcolor.push(getCountryColor(getRank(json_data.features[i])))

        }
    }

    list = sortData(labels, data_data, bgcolor)

    //Seperate sorted array back out
    for (var k = 0; k < list.length; k++) {
        labels[k] = list[k].name;
        data_data[k] = list[k].value;
        bgcolor[k] = list[k].color;
    }



    var databank = {
        datasets: [{
            data: data_data,
            backgroundColor: bgcolor
        }],
        labels: labels
    };

    return databank
}


//Input:  None
//Output: databank
//Method: build or rebuild a graph.
function buildGraph() {
    chart
    graphLoader()
    console.log(chart)
    if (chart != undefined) {
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
        label: "this",

        // The data for our dataset
        // data: {[ data: [1,2,3] , labels: [me,you,them] ]}
        data: graphLoader(),

        // Configuration options go here

        //Good place to see the structure of things
        //https://jsfiddle.net/94o6vc9w/
        options: {
            tooltips: {
                backgroundColor: 'rgba(50, 50, 50, 0.4)',
                displayColors: false,
                position: 'nearest',
                titleFontSize: 13,
                bodyFontSize: 13,
                xAlign: 'right'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        maxRotation: 0,
                        max: 2000000,
                        stepSize: 250000,
                        minor: {
                            max: 500000,
                            stepSize: 2500
                        },
                        gridLines: {
                            //Nothing I put in here is taking...
                            color: 'rgba(255, 255, 255, 0.2)',
                            lineWidth: 10
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Inbound Tourists'
                    },
                    afterFit: function (scaleInstance) {
                        scaleInstance.width = 300; // sets the width to 100px
                    }
                }],
                yAxes: [{
                    barPercentage: 1,
                    gridLines: {
                        zeroLineWidth: 10
                    }

                }]
            },
            legend: {
                labels: {
                    fontColor: 'white' //set your desired color
                }
            }
        }

    });

}