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