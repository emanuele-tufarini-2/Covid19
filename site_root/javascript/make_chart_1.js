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


// PRIMO GRAFICO
// inserire una colonna dell oggetto in un array
var col01 = csvSlice.map(d => d[1]);
// convertire l array str in int
var col01 = col01.map(i=>Number(i));
// unire due array in un array multidimensionale
var item_1 = col00.map(function(v,i) {
	return [v, col01[i]];
});

// SECONDO GRAFICO
// inserire una colonna dell oggetto in un array
var col02 = csvSlice.map(d => d[2]);
// convertire l array str in int
var col02 = col02.map(i=>Number(i));
// unire due array in un array multidimensionale
var item_2 = col00.map(function(v,i) {
	return [v, col02[i]];
});

// TERZO GRAFICO
// inserire una colonna dell oggetto in un array
var col03 = csvSlice.map(d => d[3]);
// convertire l array str in int
var col03 = col03.map(i=>Number(i));
// unire due array in un array multidimensionale
var item_3 = col00.map(function(v,i) {
	return [v, col03[i]];
});



// GRAFICO NUOVI POSITIVI TUSCANIA
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	var data = google.visualization.arrayToDataTable(item_1, true);

	var options = {
		title: 'nuovi positivi tuscania',
		curveType: 'function',
		legend:"none",
		colors: ['red'],
		hAxis: {
			format: 'd/MM'
		},
		chartArea: {
			height: "100%",
			width: "92%"
		}
	};

	var chart = new google.visualization.LineChart(document.getElementById('make_chart_1'));
	chart.draw(data, options);
	
	
	
	
	var data = google.visualization.arrayToDataTable(item_2, true);;
	console.log(JSON.stringify(data));
	var options = {
		title: 'negativizzati tuscania',
		curveType: 'function',
		legend:"none",
		colors: ['green'],
		hAxis: {
			format: 'd/MM'
		},
		chartArea: {
			height: "100%",
			width: "92%"
		}
	};

	var chart = new google.visualization.LineChart(document.getElementById('make_chart_2'));

	chart.draw(data, options);
	
	
	
	
	
	var data = google.visualization.arrayToDataTable(item_3, true);;
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
			height: "100%",
			width: "92%"
		}
	};

	var chart = new google.visualization.LineChart(document.getElementById('make_chart_3'));
	chart.draw(data, options);
	
	
	
}
