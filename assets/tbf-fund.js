(function(altana, undefined) {

    function drawCharts() {
    altana.loadVisualization('TBF+Simulated+Perf+History.csv', altana.drawLine, 'tbf-fund-line01');
    altana.loadVisualization('TBF+Summary+Statistical+Data.csv', altana.drawPerfTable, 'tbf-fund-table01');
    altana.loadVisualization('TBF+Annual+Sim+Perf+Summary.csv', altana.drawPerfTable, 'tbf-fund-table02', true, 1);
    altana.loadVisualization('TBF+Fund+Codes.csv', altana.drawPerfTable, 'tbf-fund-table03');
    altana.loadVisualization('TBF+Sector+Alloc.csv', altana.drawColumn, 'tbf-fund-column01');
    altana.loadVisualization('TBF+Sector+Alloc+full+titles.csv', altana.drawPerfTable, 'tbf-fund-table04');
    }

    function drawGoogleVisualizations() {
        // Load the Visualization API and the corechart package.
        google.charts.load('current', {
            'packages': ['corechart', 'table', 'gauge', 'geochart']
        });
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawCharts);
    }


    window.addEventListener('DOMContentLoaded', drawGoogleVisualizations);
    window.onresize = function(event) {
        drawGoogleVisualizations();
    };

})(window.altana = window.altana || {});