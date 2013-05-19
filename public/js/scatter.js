var plot = [];

var incrementors = [];

for (var i = 0; i < customers.length; i++) {
  var xAxis = parseInt(customers[i].HOUSEHOLD_NUM);
  if (customers[i].State) {
 
   var inc = 1;
   incrementors[xAxis] = {
     0: 0,
     1: 0,
     2: ''
   };
   if (plot[xAxis]){
     var newX = parseInt(customers[i][comparison.x] * 10000) / 10000;

     var incrementor = parseInt(customers[i][comparison.y] * 10000);
     
     var transtotal = (incrementors[xAxis][0] * 10000 + incrementor) / 10000;   
     incrementors[xAxis][0] = transtotal;  
     
     var count = parseInt(incrementors[xAxis][1]) + 1;
     incrementors[xAxis][1] = count;
     
     var newY = (incrementors[xAxis][0] / incrementors[xAxis][1]) / 10000;
  
     plot[xAxis] = [newX];
   } else {
     plot[xAxis] = [parseInt(customers[i][comparison.x])];
     incrementors[xAxis][1] = 1;
     incrementors[xAxis][0] = parseInt(customers[i][comparison.x]);
   }
  }
}

incrementors = cleanArray(incrementors);
plot = cleanArray(plot);

for (var i = 0; i < incrementors.length; i++) {
  i = parseInt(i);
  average = (incrementors[i][0] / incrementors[i][1]);
  plot[i][1] = average;
  
  // remove ghost identical numbers... not sure where they're coming from;
  
  if (plot[i][0] == plot[i][1]) {
    delete plot[i];
    delete incrementors[i];
  }
}

plot = cleanArray(plot);

plot.unshift([comparison.x, comparison.y]);

console.log(plot);

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable(plot);

  var options = {
    title: comparison.x + ' Vs. ' + comparison.y,
    hAxis: {
      title: comparison.x,
      //minValue: 0,
      //maxValue: 1,
      //viewWindowMode: 'explicit',
      //viewWindow: {
      //  max: 100,
      //  min: 0
      //}
    },
    vAxis: {
      title: comparison.y,
      ///minValue: 0, 
      //maxValue: 400, 
      //viewWindowMode: 'explicit',
      //viewWindow: {
      //  max: 60,
      //  min: 0
      //}
    },
    legend: 'none',
    height: 600
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function cleanArray(actual){
  var newArray = new Array();
  for(var i = 0; i<actual.length; i++){
      if (actual[i]){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}