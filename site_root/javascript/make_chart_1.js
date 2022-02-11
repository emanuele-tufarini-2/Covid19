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

// FIRST CHART
// Insert an object column in an array
var col01 = csvSlice.map(d => d[1]);
// Convert array str to int
var col01 = col01.map(i=>Number(i));
// Merge two arrays into one multidimensional array
var item_1 = col00.map(function(v,i) {
	return [v, col01[i]];
});

// SECOND CHART
// Insert an object column in an array
var col02 = csvSlice.map(d => d[2]);
// Convert array str to int
var col02 = col02.map(i=>Number(i));
// Merge two arrays into one multidimensional array
var item_2 = col00.map(function(v,i) {
	return [v, col02[i]];
});

// THIRD CHART
// Insert an object column in an array
var col03 = csvSlice.map(d => d[3]);
// Convert array str to int
var col03 = col03.map(i=>Number(i));
// Merge two arrays into one multidimensional array
var item_3 = col00.map(function(v,i) {
	return [v, col03[i]];
});

google.charts.load('current', {'packages':['corechart'], language: 'it'});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	// CHART POSITIVE
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

	var chart = new google.visualization.LineChart(document.getElementById('make_chart_1'));
	chart.draw(data, options);

	// CHART NEGATIVES
	var data = google.visualization.arrayToDataTable(item_2, true);;
	console.log(JSON.stringify(data));
	var options = {
		title: 'negativizzati tuscania',
		curveType: 'function',
		legend:"none",
		colors: ['green'],
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
	
	// CHART TOTAL POSITIVE
	var data = google.visualization.arrayToDataTable(item_3, true);;
	console.log(JSON.stringify(data));
	var options = {
		title: 'attualmente positivi tuscania',
		curveType: 'function',
		legend:"none",
		colors: ['blue'],
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

	var chart = new google.visualization.LineChart(document.getElementById('make_chart_3'));
	chart.draw(data, options);
	
	
	
}
