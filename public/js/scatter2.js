console.log(customers.length);

var customerData = [];

customerData.push(['Median Household Income', 'Transaction Amount']);

for (var i = 0; i < customers.length; i++) {
  if (customers[i].Median_HH_Inc) {
    var sample = [customers[i].Median_HH_Inc, customers[i].Total_Transaction]
    customerData.push(sample);
  }
}

console.log(customerData);

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable(customerData);

  var options = {
    title: 'Median Household Income Vs. Transaction Amount',
    hAxis: {title: 'Median Household Income', minValue: 0, maxValue: 240000},
    vAxis: {title: 'Transaction Amount', minValue: 0, maxValue: 400},
    legend: 'none',
    height: 600
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}