(function(altana, undefined) {

    function drawCharts() {
        altana.loadVisualization('existing/growth_aias.csv', altana.drawLine, 'adas-fund-line01');
        altana.loadVisualization('adas_monthly_perf_ALTDASA.csv', altana.drawPerfTable, 'adas-fund-table01', false, 2);
//        altana.loadVisualization('adas_monthly_perf_ALTDASA_net.csv', altana.drawPerfTable, 'adas-fund-table01net', false, 2);
        altana.loadVisualization('adas_monthly_perf_GS.csv', altana.drawPerfTable, 'adas-fund-table02', false, 2);
        altana.loadVisualization('adas_monthly_perf_HFRX.csv', altana.drawPerfTable, 'adas-fund-table03', false, 2);
        altana.loadVisualization('adas_monthly_perf_split_returns.csv', altana.drawPerfTable, 'adas-fund-table04', false, 2);
        altana.loadVisualization('existing/gross_net_exposure.csv', altana.drawArea, 'adas-fund-area01');
        altana.loadVisualization('existing/open_positions.csv', altana.drawArea, 'adas-fund-area02');
        altana.loadVisualization('adas_monthly_perf_gross_net.csv', altana.drawPerfTable, 'adas-fund-table05', false, 0);
        altana.loadVisualization('existing/sector_exposure_long.csv', altana.drawDonut, 'adas-fund-donut01');
        altana.loadVisualization('existing/sector_exposure_short.csv', altana.drawDonut, 'adas-fund-donut02');
        altana.loadVisualization('existing/cap_aias_net.csv', altana.drawColumn, 'adas-fund-column01');
        altana.loadVisualization('ADAS_share_classes.csv', altana.drawPerfTable, 'adas-fund-table06');
        altana.loadVisualization('adas_monthly_perf_ALTDASA.csv', altana.drawSummaryFromPerfData, 'adas-fund-table07');
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