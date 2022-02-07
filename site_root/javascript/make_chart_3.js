// REQUEST DEI DATI DEL CSV
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
// inserire la prima colonna dell oggetto in un array
var col00 = csvSlice.map(d => d[0]);
// convertire l array str in date
var col00 = col00.map(d => new Date(d))
// inserire una colonna dell oggetto in un array
var col01 = csvSlice.map(d => d[3]);
// convertire l array str in int
var col01 = col01.map(i=>Number(i));
// unire due array in un array multidimensionale
var item = col00.map(function(v,i) {
	return [v, col01[i]];
});
// stampare il contenuto dell oggetto nella console
console.log(JSON.stringify(item));

// GRAFICO NUOVI POSITIVI TUSCANIA
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	var data = google.visualization.arrayToDataTable(item, true);;
	console.log(JSON.stringify(data));
	var options = {
		title: 'attualmente positivi tuscania',
		curveType: 'function',
		legend:"none",
		colors: ['blue'],
		hAxis: {
			format: 'd/MM'
		},
		chartArea: {
			height: "94%",
			width: "94%"
		}
	};

	var chart = new google.visualization.LineChart(document.getElementById('make_chart_3'));

	chart.draw(data, options);
}
