(function(altana, undefined) {

    function drawCharts() {
    altana.loadVisualization('existing/eu_filings_map.csv', altana.drawMap, 'adas-dir-eu-map01', '150', 'countries');
    altana.loadVisualization('existing/eu_director_activity_ratio.csv', altana.drawGauge, 'adas-dir-eu-gauge01');
    altana.loadVisualization('existing/eu_director_activity.csv', altana.drawArea, 'adas-dir-eu-area01');
    altana.loadVisualization('existing/eu_director_activity_ratio_history.csv', altana.drawLine, 'adas-dir-eu-line01');
    altana.loadVisualization('existing/eu_filings.csv', altana.drawArea, 'adas-dir-eu-area02');
    altana.loadVisualization('existing/eu_director_rank_pecent.csv', altana.drawArea, 'adas-dir-eu-area03', 'percent');
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