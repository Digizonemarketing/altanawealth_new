(function(altana, undefined) {

    const docRoot = 'https://mybrightidea.squarespace.com/assets/chart-data/';
    //const docRoot = 'https://s3.amazonaws.com/cdn.altanawealth.com/public/csv/';

    const gold = '#b89d18';
    const lightblue = '#367bb7';
    const darkblue = 'rgb(2, 2, 136)';

    makeTimeSeries = function(data) {
        var timeSeriesData;
        timeSeriesData = new google.visualization.DataTable();

        timeSeriesData.addColumn('string', data.bf[0].label);

        for (var i = 1; i < data.bf.length; ++i) {
            timeSeriesData.addColumn('number', data.bf[i].label);
        }

        const origRows = data.getNumberOfRows();
        timeSeriesData.addRows(origRows);

        for (var i = 0; i < data.getNumberOfRows(); i++) {
            timeSeriesData.setCell(i, 0, data.getValue(i, 0));
            for (var j = 1; j < data.bf.length; ++j) {
                timeSeriesData.setCell(i, j, parseFloat(data.getValue(i, j)));
            };
        }

        return timeSeriesData;
    }

    formatPerfDataTable = function(data, leadingPlusSign, formatDP) {
        var perfData;
        perfData = new google.visualization.DataTable();

        // create columns
        console.log(data);
        perfData.addColumn('string', data.bf[0].label);
        for (var i = 1; i < data.bf.length; ++i) {
            perfData.addColumn('number', data.bf[i].label);
        }

        // create rows
        perfData.addRows(data.getNumberOfRows());

        const fmt = new Intl.NumberFormat(undefined, {
            style: "decimal",
            minimumFractionDigits: formatDP,
            maximumFractionDigits: formatDP
        })

        for (var i = 0; i < data.getNumberOfRows(); ++i) {
            //add first column data (not formatted - just transcribed)
            perfData.setCell(i, 0, data.getValue(i, 0));

            //add subsequent columns with formatting
            for (var j = 1; j < data.getNumberOfColumns(); ++j) {
                var val = parseFloat(data.getValue(i, j));
                var fmtVal = fmt.formatWithSign(val) + '%';

                if (isNaN(val)) {
                    val = '';
                    fmtVal = '';
                } else {

                }
                perfData.setCell(i, j, val, fmtVal);
            };
        }
        return perfData;
    }

    altana.drawDonut = function(data, div) {
        // Set chart options
        var options = {
            pieHole: 0.5,
            pieSliceBorderColor: "#fff",
            pieResidueSliceColor: "#ccc",
            slices: [{
                offset: "#bf211e",
                color: "#bf211e"
            }, {
                offset: "#f9dc5c",
                color: "#f9dc5c"
            }, {
                offset: "#c2a303",
                color: "#c2a303"
            }, {
                offset: "#e9ce2c",
                color: "#e9ce2c"
            }, {
                offset: "#5e0b15",
                color: "#5e0b15"
            }, {
                offset: "#d9cab3",
                color: "#d9cab3"
            }],
            height: 400,
            backgroundColor: {
                stroke: "#666",
                fill: "#fff"
            },
            legend: { position: 'bottom', alignment: 'center' }
        };

        var chart = new google.visualization.PieChart(document.getElementById(div));
        chart.draw(makeTimeSeries(data), options);
    }

    altana.drawColumn = function(data, div) {
        // Set chart options
        var options = {
            chartArea: {
                width: '90%',
                height: '90%'
            },
            height: '480',
            legend: 'bottom',
            colors: [lightblue, gold]
        }

        var chart = new google.visualization.ColumnChart(document.getElementById(div));
        chart.draw(makeTimeSeries(data), options);
    }

    altana.drawArea = function(data, div, isStacked) {
        // Set chart options
        var options = {
            chartArea: {
                width: '90%',
                height: '90%'
            },
            legend: 'bottom',
            colors: [lightblue, gold, darkblue],
            isStacked: isStacked
        }

        var chart = new google.visualization.AreaChart(document.getElementById(div));
        chart.draw(makeTimeSeries(data), options);
    }

    altana.drawSummaryFromPerfData = function(data, div) {

        const fmt = new Intl.NumberFormat(undefined, {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })


        var dataSubset = new google.visualization.DataTable();
        dataSubset.addColumn('string', 'Title');
        dataSubset.addColumn('number', 'Return');
        const origCols = data.getNumberOfColumns();
        const origRows = data.getNumberOfRows();

        dataSubset.addRows([
            [data.getColumnLabel(origCols - 2), {
                v: parseFloat(data.getValue(origRows - 1, origCols - 2)),
                f: fmt.formatWithSign(parseFloat(data.getValue(origRows - 1, origCols - 2))) + '%'
            }],
            [data.getColumnLabel(origCols - 1), {
                v: parseFloat(data.getValue(origRows - 1, origCols - 1)),
                f: fmt.formatWithSign(parseFloat(data.getValue(origRows - 1, origCols - 1))) + '%'
            }]
        ]);

        altana.drawSummaryPerfTable(dataSubset, div);
    }

    altana.drawSummaryPerfTable = function(data, div) {
        var cssClassNames = {
            headerCell: 'ag-no-header',
            headerRow: 'ag-table-summary-hdr',
            tableRow: 'ag-table-summary-row',
            oddTableRow: 'ag-table-summary-odd-row'
        };
        // Set chart options

        var options = {
            allowHtml: true,
            showRowNumber: false,
            cssClassNames: cssClassNames,
            width: '100%'
        };

        var chart = new google.visualization.Table(document.getElementById(div));
        chart.draw(data, options);
    }


    altana.drawLine = function(data, div) {
        // Set chart options
        var options = {
            chartArea: {
                width: '90%',
                height: '90%'
            },
            height: '480',
            legend: 'bottom',
            colors: [lightblue, gold, darkblue],
            vAxis: {
                format: '0'
            },
            hAxis: {
                format: 'MM/YY'
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById(div));
        chart.draw(makeTimeSeries(data), options);
    }

    altana.drawMap = function(data, div, region, resolution) {

        var mapData;
        mapData = new google.visualization.DataTable();
        mapData.addColumn('string', 'Country');
        mapData.addColumn('number', 'Filings');
        const origRows = data.getNumberOfRows();

        for (var i = 0; i < data.getNumberOfRows(); i++) {
            mapData.addRows([
                [data.getValue(i, 0), {
                    v: parseFloat(data.getValue(i, 1))
                }]
            ]);
        }


        // Set chart options
        var options = {
            datalessRegionColor: 'rgb(227, 213, 140)',
            colorAxis: {
                colors: ['lightblue', darkblue]
            },
            region: region,
            resolution: resolution
        };
        var chart = new google.visualization.GeoChart(document.getElementById(div));
        chart.draw(mapData, options);
    }


    Intl.NumberFormat.prototype.formatWithSign = function(x) {
        let y = this.format(x);
        return x < 0 ? y : '+' + y;
    }

    altana.drawGauge = function(data, div) {

        const fmt = new Intl.NumberFormat(undefined, {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })

        var gaugeData = new google.visualization.DataTable();
        gaugeData.addColumn('number', 'Sentiment');
        gaugeData.addRows(1);

        var val = parseFloat(data.getValue(0, 1));

        gaugeData.setCell(0, 0,
            val,
            fmt.formatWithSign(val));

        var cssClassNames = {};
        // Set chart options
        var gaugeOptions = {
            //weird - gauge only reacts to height
            height: 300,
            min: -1,
            max: 1,
            yellowFrom: -0.33,
            yellowTo: 0.33,
            redFrom: -1,
            redTo: -0.33,
            greenFrom: 0.33,
            greenTo: 1,
            majorTicks: ["-1.0", "0", "+1.0"],
            minorTicks: 2,
            greenColor: "#77dd77",
            yellowColor: "#FADA5E",
            redColor: "#F2003C"
        };
        gauge = new google.visualization.Gauge(document.getElementById(div));
        gauge.draw(gaugeData, gaugeOptions);
    }

    altana.drawPerfTable = function(data, div, leadingPlusSign, formatDP) {

        leadingPlusSign = (typeof leadingPlusSign !== 'undefined') ? leadingPlusSign : false;
        formatDP = (typeof formatDP !== 'undefined') ? formatDP : -1;

        var tableData = null;

        if (leadingPlusSign || formatDP >= 0) {
            tableData = formatPerfDataTable(data, leadingPlusSign, formatDP);
        } else {
            tableData = data;
        }

        var cssClassNames = {
            headerRow: 'ag-table-hdr',
            tableRow: 'ag-table-row',
            oddTableRow: 'ag-table-odd-row'
        };

        // Set chart options
        var options = {
            showRowNumber: false,
            width: '100%',
            cssClassNames: cssClassNames
        };

        var chart = new google.visualization.Table(document.getElementById(div));
        chart.draw(tableData, options);
    }

    function stringTo2dArray(string, d1, d2) {
        return string.split(d1).map(function(x) {
            return x.split(d2)
        });
    }

    altana.loadVisualization = function(chartFile, chartLoader, div, param1, param2) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                loadVizCallBack(this, chartLoader, div, param1, param2);
            }
        };
        chartFile = docRoot + chartFile;
        xhttp.open("GET", chartFile, true);
        xhttp.send();
    }

    function loadVizCallBack(xml, chartLoader, div, param1, param2) {
        var tableData = stringTo2dArray(xml.responseText, '\n', ',');
        tableData = tableData.slice(0, tableData.length - 1);
        chartLoader(google.visualization.arrayToDataTable(tableData), div, param1, param2);
    }




})(window.altana = window.altana || {});