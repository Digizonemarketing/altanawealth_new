(function(altana, undefined) {

    function drawCharts() {
        altana.loadVisualization('adas_monthly_perf_ALTDASA.csv', altana.drawSummaryFromPerfData, 'adas-fund-intro-table01');
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