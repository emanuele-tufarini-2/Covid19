d3.text("https://raw.githubusercontent.com/emanuele-tufarini-2/Tuscania-Covid19-Dataset/main/andamento_contagi_covid19_tuscania.csv", function(data) {
    var parsedCSV = d3.csv.parseRows(data);

    var container = d3.select("#make_table")
        .append("table")

    .selectAll("tr")
        .data(parsedCSV).enter()
        .append("tr")

    .selectAll("td")
        .data(function(d) {
            return d;
        }).enter()
        .append("td")
        .text(function(d) {
            return d;
        });
});
