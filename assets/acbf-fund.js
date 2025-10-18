(function(altana, undefined) {

    function drawCharts() {
    altana.loadVisualization('acbf_monthly_perf_ALTCBOU.csv', altana.drawSummaryFromPerfData, 'acbf-fund-table05');
    altana.loadVisualization('acbf_monthly_perf_ALTCBOU.csv', altana.drawPerfTable, 'acbf-fund-table01', false, 2);
    altana.loadVisualization('acbf_monthly_perf_ALTCBCG.csv', altana.drawPerfTable, 'acbf-fund-table02', false, 2);
    altana.loadVisualization('acbf_monthly_perf_ALTCBAE.csv', altana.drawPerfTable, 'acbf-fund-table03', false, 2);
    altana.loadVisualization('ACBF_share_classes.csv', altana.drawPerfTable, 'acbf-fund-table04');
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