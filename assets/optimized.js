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
(function(altana, undefined) {
    window.addEventListener('DOMContentLoaded', function() {

        var anchors = document.getElementsByTagName("a");

        for (var i = anchors.length - 1; i >= 0; i--) {
            if (anchors[i].href.includes('mailto'))
                anchors[i].classList.add('mailto');
        }
    });
})(window.altana = window.altana || {});
(function(altana, undefined) {
    var pageToClassMap = [{
            pageName: 'adas-overview',
            fundClass: 'adas'
        }, {
            pageName: 'adas-fund-information',
            fundClass: 'adas'
        }, {
            pageName: 'adas-research-and-sentiment-data',
            fundClass: 'adas'
        }, {
            pageName: 'adas-directors-report-us',
            fundClass: 'adas'
        }, {
            pageName: 'adas-directors-report-europe',
            fundClass: 'adas'
        }, {
            pageName: 'adas-directors-report-asia',
            fundClass: 'adas'
        }, {
            pageName: 'acbf-overview',
            fundClass: 'acbf'
        }, {
            pageName: 'acbf-fund-information',
            fundClass: 'acbf'
        }, {
            pageName: 'top-test',
            fundClass: 'acbf'
        }, {
            pageName: 'apas-strategy-information',
            fundClass: 'apas'
        }, {
            pageName: 'acfo-strategy-information',
            fundClass: 'acfo'
        }, {
            pageName: 'tbf-overview',
            fundClass: 'tbf'
        }, {
            pageName: 'tbf-fund-information',
            fundClass: 'tbf'
        }, {
            pageName: 'asip-overview',
            fundClass: 'asip'
        }, {
            pageName: 'asip-fund-information',
            fundClass: 'asip'
        }, {
            pageName: 'aspa-overview',
            fundClass: 'aspa'
        }, {
            pageName: 'aspa-strategy-information',
            fundClass: 'aspa'
        }, {
            pageName: 'acf-overview',
            fundClass: 'acf'
        }, {
            pageName: 'acf-fund-information',
            fundClass: 'acf'
        }, {
            pageName: 'asf-overview',
            fundClass: 'asf'
        }, {
            pageName: 'asf-strategy-information',
            fundClass: 'asf'
        }, {
            pageName: 'adcf-overview',
            fundClass: 'adcf'
        }, {
            pageName: 'adcf-strategy-information',
            fundClass: 'adcf'
        }, {
            pageName: 'adaf-overview',
            fundClass: 'adaf'
        }, {
            pageName: 'adaf-strategy-information',
            fundClass: 'adaf'
        }, {
            pageName: 'acof-overview',
            fundClass: 'acof'
        }, {
            pageName: 'acof-strategy-information',
            fundClass: 'acof'
        }, {
            pageName: 'acsaf-overview',
            fundClass: 'acsaf'
        }, {
            pageName: 'acsaf-strategy-information',
            fundClass: 'acsaf'
        }, {
            pageName: 'agcf-overview',
            fundClass: 'agcf'
        }, {
            pageName: 'agcf-strategy-information',
            fundClass: 'agcf'
        },
        {
            pageName: 'adof-overview',
            fundClass: 'adof'
        }, {
            pageName: 'adof-strategy-information',
            fundClass: 'adof'
        },
        {
            pageName: 'aaof-overview',
            fundClass: 'aaof'
        }, {
            pageName: 'aaof-strategy-information',
            fundClass: 'aaof'
        },
        {
            pageName: 'aci-overview',
            fundClass: 'aci'
        }, {
            pageName: 'aci-strategy-information',
            fundClass: 'aci'
        },
        {
            pageName: 'scaf-overview',
            fundClass: 'scaf'
        }, {
            pageName: 'scaf-strategy-information',
            fundClass: 'scaf'
        },
        {
            pageName: 'all-funds-documents',
            fundClass: ''
        }, {
            pageName: 'all-funds',
            fundClass: ''
        }
    ];



    function addFundClassIfRequired() {
        // get name of page
        var thisPage = window.location.pathname.split('/').slice(-1)[0];



        // test if page exists in pageToClassMap array
        // pageToClassMap defined in codeInjections
        // NOT WORK IN INTERNET EXPLORER    var result = pageToClassMap.filter(x => x.pageName === thisPage);
        var result = pageToClassMap.filter(function(x) {
            return x.pageName === thisPage;
        });

        if (result.length != 0) {
            document.getElementsByTagName("BODY")[0].classList.add("page-with-fund-headers");
            if (result[0].fundClass != '') {
                document.getElementsByTagName("BODY")[0].classList.add(result[0].fundClass);
            }
        }
    };
    window.addEventListener('DOMContentLoaded', addFundClassIfRequired);
})(window.altana = window.altana || {});
// header-modified.js - optimized version
(function(altana, undefined) {
    'use strict';
    
    var pagesModifiedHeader = ['home', 'home-new'];
    
    function addModifiedHeaderIfRequired() {
        var pageName = window.location.pathname.split('/').pop() || 'home';
        if (pagesModifiedHeader.includes(pageName)) {
            document.body.classList.add('header-modified');
        }
    }
    
    // Wait for load instead of DOMContentLoaded
    if (document.readyState === 'loading') {
        window.addEventListener('load', addModifiedHeaderIfRequired);
    } else {
        addModifiedHeaderIfRequired();
    }
})(window.altana = window.altana || {});

(function(altana, undefined){

    var modal = null;
    var span = null;

    window.addEventListener('DOMContentLoaded', function() {
        document.getElementById('share-email').addEventListener("click", altana.shareByEmail);
        document.getElementById('share-facebook').addEventListener("click", altana.shareByFacebook);
        document.getElementById('share-linkedin').addEventListener("click", altana.shareByLinkedin);
        document.getElementById('share-messenger-desktop').addEventListener("click", altana.shareByMessengerDesktop);
        document.getElementById('share-messenger-mobile').addEventListener("click", altana.shareByMessengerMobile);
        document.getElementById('share-twitter').addEventListener("click", altana.shareByTwitter);
        document.getElementById('share-whatsapp').addEventListener("click", altana.shareByWhatsapp);
        document.getElementById('share-share').addEventListener("click", altana.shareByShare);
        document.getElementById('follow-email').addEventListener("click", altana.followByEmail);
        document.getElementById('follow-linkedin').addEventListener("click", altana.followByLinkedin);
        document.getElementById('follow-teamtailor').addEventListener("click", altana.followByTeamtailor);

    });

    altana.shareByEmail = function() {
        var href = "mailto:?subject=";
        href = href + "Shared from Altana Wealth";
        href = href + "\&body=Sharing content from Altana Wealth " + window.location.href;
        hrefClick(href);
    };

    altana.followByEmail = function() {
        signUpButtonClick()
    };

    altana.shareByFacebook = function() {
        // https://developers.facebook.com/docs/sharing/reference/feed-dialog/
        /*
            var href="http://www.facebook.com/dialog/feed"
            href = href + "?app_id=972752376410619";
            href = href + "&redirect_uri=" + encodeURI(window.location);
            href = href + "&display=popup";
            href = href + "&link=" + encodeURI(window.location);

            window.open (href, 
                '_blank', 
                'toolbar=no,scrollbars=yes,resizable=no,fullscreen=no,top=50,left=50,width=555,height=615');
        */
        FBShare('share');
    };

    altana.shareByLinkedin = function() {
        var url = window.location.href;
        var text = "A page of interest on Altana Wealth website";
        hrefDialog(encodeURI('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=&summary=' + text + '&source=Altana Wealth'));
    };

    altana.followByLinkedin = function() {
        window.open(encodeURI("https://www.linkedin.com/company/altana-wealth/about/"), '_blank');
    };

    altana.followByTeamtailor = function() {
        window.open(encodeURI("https://altanawealth.teamtailor.com"), '_blank');
    };



    altana.shareByMessengerMobile = function() {
        var url = window.location.href;
        var href = "fb-messenger://share";
        href = href + "?app_id=972752376410619";
        href = href + "&amp;redirect_uri=" + url;
        href = href + "&amp;link=" + url;

        var attributes = [{
            name: "rel",
            value: "noopener"
        }, {
            name: "target",
            value: "_blank"
        }];

        hrefClick(href, attributes);
    };

    altana.shareByMessengerDesktop = function() {
        /*
            var href = "http://www.facebook.com/dialog/send";
            href = href + "?app_id=972752376410619";
            href = href + "&redirect_uri=" + encodeURI(window.location);
            href = href + "&link=" + encodeURI(window.location);
            href = href + "&display=popup";


            window.open (href, 
                '_blank', 
                'toolbar=no,scrollbars=yes,resizable=no,fullscreen=no,top=50,left=50,width=555,height=615');
        */
        FBShare('share');

    };

    function FBShare(method) {
        FB.ui({
            method: method,
            href: window.location.href
        }, function(response) {});

    }
    altana.shareByTwitter = function() {
        var url = window.location.href;
        var hashtags = "altanawealth,altana";
        var text = "A page of interest on Altana Wealth website";
        hrefDialog(encodeURI('https://twitter.com/intent/tweet?text=' + text + '\&url=' + url + '\&hashtags=' + hashtags));
    }
    altana.shareByWhatsapp = function() {
        var url = window.location.href;
        var shareText = "A page of interest on Altana Wealth website";
        var attributes = [{
            name: "data-action",
            value: "share/whatsapp/share"
        }, {
            name: "target",
            value: "_blank"
        }];

        var href = encodeURI('whatsapp://send?text=' + shareText + ' ' + url);

        hrefClick(href, attributes);
    };
    altana.shareByShare = function() {
        var copyText = document.createElement("textarea");
        document.body.appendChild(copyText);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        copyText.value = encodeURI(window.location.href);
        copyText.select();
        document.execCommand("copy");

        // Get the modal
        modal = document.getElementById("copyModal");
        // Get the <span> element that closes the modal
        span = document.getElementsByClassName("close")[0];

        var a = document.getElementById("copy-text")
        a.innerHTML = window.location.href;
        a.href = copyText.value;
        modal.style.display = "block";

        document.body.removeChild(copyText);

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    };
    function hrefDialog(href) {

        window.open(href,
            '_blank',
            'toolbar=no,scrollbars=yes,resizable=no,fullscreen=no,top=50,left=50,width=550,height=250');
    }
    function hrefClick(href, attributes) {

        if (typeof attributes === 'undefined') {
            attributes = [];
        }

        var a = document.createElement("a");

        a.href = encodeURI(href);
        a.href = href;

        for (var i = 0; i < attributes.length; i++) {
            a.setAttribute(attributes[i].name, attributes[i].value);
        }
        a.click();
    }
})(window.altana = window.altana || {});
(function(altana, undefined) {
    var usingOnMobile = null;

    window.addEventListener('DOMContentLoaded', function() {
        window.addEventListener('resize', handleWindowResize);
        handleWindowResize();
    });

    function handleWindowResize() {
        usingOnMobile = detectmob();
        var bodyID = document.getElementsByTagName("BODY")[0];

        if (usingOnMobile) {
            bodyID.classList.add("altana-mobile");
            bodyID.classList.remove("altana-not-mobile");
        } else {
            bodyID.classList.add("altana-not-mobile");
            bodyID.classList.remove("altana-mobile");
        }
        //        console.log("<" + navigator.userAgent + "><" + usingOnMobile + ">");
    };

    function detectmob() {
        if (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        } else {
            return false;
        }
    }
})(window.altana = window.altana || {});
(function(altana, undefined) {
    window.addEventListener('DOMContentLoaded', function() {
        document.getElementById('copyright-year').innerHTML = 1900 + (new Date()).getYear();
    });
})(window.altana = window.altana || {});
(function(altana, undefined) {
    function reRoutePDFs() {
        // get list of href to files
        var pdfTags = Array.from(document.getElementsByTagName("A")).filter(linkOfInterest);

        //disclaimer will log to console for now then open in blank window when implemented logic to go in disclaimerGate function
        pdfTags.forEach(function(element) {
            element.setAttribute("onclick", "altana.disclaimerGate('" + element.href + "');");
            element.setAttribute("target", "_blank");
            element.removeAttribute("href");
            element.classList.add("disclaimer-file-href");
        });
    };

    function linkOfInterest(a) {
        let fileExtensions = [".pdf", ".xlsx"];
        return fileExtensions.some(o => (a.href.toLowerCase()).includes(o));
    }

    altana.disclaimerGate = function(href) {
        console.log(href);

        if (typeof attributes === 'undefined') {
            attributes = [];
        }

        var a = document.createElement("a");

        a.href = encodeURI(href);
        a.href = href;

        var attributes = [{
            name: "target",
            value: "_blank"
        }];

        for (var i = 0; i < attributes.length; i++) {
            a.setAttribute(attributes[i].name, attributes[i].value);
        }
        a.click();
    }


    window.addEventListener('DOMContentLoaded', reRoutePDFs);

})(window.altana = window.altana || {});
(function(altana, undefined) {
    // Changes the format of date on summary items
    var myObj = document.getElementsByClassName('summary-metadata-item--date');
    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    for (var i = 0; i < myObj.length; ++i) {
        var item = myObj[i];
        var date = new Date(item.innerHTML);
        item.innerHTML = date.toLocaleDateString('en-GB', options);
    }
})(window.altana = window.altana || {});
window.addEventListener('DOMContentLoaded', function() {
    var signUpButton = document.getElementById('sign-up');
    if (signUpButton != undefined) {signUpButton.addEventListener("click", signUpButtonClick)};
});


function signUpButtonClick(){
 window.open(encodeURI("/insights-sign-up"), '_blank');

}


/* Deprecated
window.addEventListener('DOMContentLoaded', function() {
    signUpCloseButtonClick();
    document.getElementById('sign-up-close').addEventListener("click", signUpCloseButtonClick);
    var signUpButton = document.getElementById('sign-up');
    if (signUpButton != undefined) {signUpButton.addEventListener("click", signUpButtonClick)};
});

function signUpButtonClick_Deprecated(){
    document.getElementById('sign-up-page').style.display = 'block'; // show
    document.getElementById('cover').style.display = 'block'; 
}

function signUpCloseButtonClick_Deprecated(){
    document.getElementById('sign-up-page').style.display = 'none';
    document.getElementById('cover').style.display = 'none'; 
}
*/
(function(altana, undefined) {
    const searchValue = "mybrightidea.squarespace.com";
    const newValue = "www.altanawealth.com";
    function reBaseHrefs() {
        // get list of href to files
        var hrefs = Array.from(document.getElementsByTagName("A")).filter(linkOfInterest);

        //disclaimer will log to console for now then open in blank window when implemented logic to go in disclaimerGate function
        hrefs.forEach(function(element) {
            element.href = element.href.replace(searchValue, newValue);
        });
    };

    function linkOfInterest(a) {
        let soughtAddress = [searchValue];
        return soughtAddress.some(o => (a.href.toLowerCase()).includes(o));
    }

    window.addEventListener('DOMContentLoaded', reBaseHrefs);

})(window.altana = window.altana || {});
