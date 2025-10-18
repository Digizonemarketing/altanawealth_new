(function(altana, undefined) {

    function drawCharts() {
    altana.loadVisualization('existing/au_filings_map.csv', altana.drawMap, 'adas-dir-asia-map01', '142', 'countries');
    altana.loadVisualization('existing/au_filings_map.csv', altana.drawMap, 'adas-dir-asia-map02', '009', 'countries');
    altana.loadVisualization('existing/au_director_activity_ratio.csv', altana.drawGauge, 'adas-dir-asia-gauge01');
    altana.loadVisualization('existing/au_director_activity.csv', altana.drawArea, 'adas-dir-asia-area01');
    altana.loadVisualization('existing/au_director_activity_ratio_history.csv', altana.drawLine, 'adas-dir-asia-line01');
    altana.loadVisualization('existing/au_filings.csv', altana.drawArea, 'adas-dir-asia-area02');
    altana.loadVisualization('existing/au_director_rank_pecent.csv', altana.drawArea, 'adas-dir-asia-area03', 'percent');
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