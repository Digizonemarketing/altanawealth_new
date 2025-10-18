(function(altana, undefined) {

    function drawCharts() {
    altana.loadVisualization('existing/map_us.csv', altana.drawMap, 'adas-dir-us-map01', 'US', 'provinces');
    altana.loadVisualization('existing/director_activity_ratio.csv', altana.drawGauge, 'adas-dir-us-gauge01');
    altana.loadVisualization('existing/director_activity.csv', altana.drawArea, 'adas-dir-us-area01');
    altana.loadVisualization('existing/director_activity_ratio_history.csv', altana.drawLine, 'adas-dir-us-line01');
    altana.loadVisualization('existing/filings_transactions.csv', altana.drawArea, 'adas-dir-us-area02');
    altana.loadVisualization('existing/director_rank_pecent.csv', altana.drawArea, 'adas-dir-us-area03', 'percent');
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