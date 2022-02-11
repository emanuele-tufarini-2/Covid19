// CSV DATA REQUEST
var request = new XMLHttpRequest();  
request.open("GET", "https://raw.githubusercontent.com/emanuele-tufarini-2/Tuscania-Covid19-Dataset/main/andamento_contagi_covid19_tuscania.csv", false);   
request.send(null);  
var csvData = new Array();
var jsonObject = request.responseText.split(/\r?\n|\r/);
for (var i = 0; i < jsonObject.length; i++) {
  csvData.push(jsonObject[i].split(','));
}
// Retrived data from csv file content
var csvSlice = csvData.slice(1,90);
// Insert the first column of the object in an array
var col00 = csvSlice.map(d => d[0]);
// Convert str array to dates
var col00 = col00.map(d => new Date(d))

// Insert an object column in an array
var col01 = csvSlice.map(d => d[1]);
// Convert array str to int
var col01 = col01.map(i=>Number(i));
// Merge two arrays into one multidimensional array
var item = col00.map(function(v,i) {
	return [v, col01[i]];
});

// Print the content of the object in the console
console.log(JSON.stringify(item));

// CHART
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	// CHART
	var data = google.visualization.arrayToDataTable(item_1, true);

	var options = {
		title: 'nuovi positivi tuscania',
		curveType: 'function',
		legend:"none",
		colors: ['red'],
		pointSize: 3,
		hAxis: {
			format: 'dd/MM/yy',
			slantedText: true,
			slantedTextAngle: -90
		},
		chartArea: {
			height: "70%",
			width: "85%"
		}
	};


	var chart = new google.visualization.LineChart(document.getElementById('make_chart_2'));
	chart.draw(data, options);
}
