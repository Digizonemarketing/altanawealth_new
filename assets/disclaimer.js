(function(altana, undefined) {
    altana.calledFromPage = "/";
    altana.thisPage = window.location.href;
    const disclaimerAcceptanceLifeDays = 7;

    altana.pagesRequiringDisclaimerAcceptance = [{
            pageName: "adas-fund-information"
        }, {
            pageName: "tbf-fund-information"
        }, {
            pageName: "acf-fund-information"
        }, {
            pageName: "actf-strategy-information"
        }, {
            pageName: "adcf-strategy-information"
        }, {
            pageName: "adas-research-and-sentiment-data"
        }, {
            pageName: "adas-directors-report-us"
        }, {
            pageName: "adas-directors-report-europe"
        }, {
            pageName: "adas-directors-report-asia"
        }, {
            pageName: "acof-strategy-information"
        }, {
            pageName: "adof-strategy-information"
        },
        {
            pageName: "aspac-strategy-information"
        },
        {
            pageName: "aspa-strategy-information"
        }, {
            pageName: "pssif-fund-information"
        }, {
            pageName: "acsaf-fund-information"
        },
        {
            pageName: "acbf-fund-information"
        }
    ];

    const debug = (1 === 2);

    altana.localStorageExists = false;
    altana.disclaimerInfo = {};
    altana.acceptedDisclaimer = false;
    altana.acceptedDateTimeUTC = null;

    window.addEventListener('DOMContentLoaded', function() {

        altana.thisPage = window.location.href;
        altana.localStorageExists = (typeof(Storage) !== "undefined");

        altana.closeDisclaimerPopUp();

        document.getElementById('disclaimer-accept').addEventListener("click", altana.disclaimerAccepted);
        document.getElementById('disclaimer-decline').addEventListener("click", altana.disclaimerDeclined);
        document.getElementById('disclaimer-close').addEventListener("click", altana.disclaimerDeclined);

        altana.testDisclaimerRequired();
    });

    altana.openDisclaimerPopUp = function() {
        document.getElementById('disclaimer-page').style.display = 'flex'; // show
        document.getElementById('cover').style.display = 'block';
    }

    altana.closeDisclaimerPopUp = function() {
        document.getElementById('disclaimer-page').style.display = 'none';
        document.getElementById('cover').style.display = 'none';
    }

    altana.disclaimerAccepted = function() {
        console.log('Accepted');
        if (altana.localStorageExists) {

            localStorage.setItem('acceptedDisclaimer', true);
            localStorage.setItem('acceptedDateTimeUTC', new Date());
            altana.calledFromPage = window.location.href;
            console.log("Accepted: calledFromPage <" + altana.calledFromPage + "> this <" + altana.thisPage + ">");
        }
        altana.closeDisclaimerPopUp();
    }
    altana.disclaimerDeclined = function() {
        console.log('Declined');
        if (altana.localStorageExists) {
            localStorage.setItem('acceptedDisclaimer', false);
            localStorage.setItem('acceptedDateTimeUTC', new Date());
        }
        altana.closeDisclaimerPopUp();
        console.log("Declined: calledFromPage <" + altana.calledFromPage + "> this <" + altana.thisPage + ">");
        location.replace(altana.calledFromPage);
    }

    altana.testDisclaimerRequired = function() {
        // get name of page
        altana.thisPage = window.location.pathname.split('/').slice(-1)[0];
        console.log("this page <" + altana.thisPage + ">");

        // test if page exists in pagesRequiringDisclaimerAcceptance array
        var result = altana.pagesRequiringDisclaimerAcceptance.filter(x => x.pageName === altana.thisPage).length;

        if (result != 0) {

            // debug only
            if (debug) {
                console.log("Page requires disclaimer to be accepted");
                if (altana.localStorageExists && confirm("Clear local Storage?")) {
                    localStorage.removeItem('acceptedDisclaimer');
                    localStorage.removeItem('acceptedDateTimeUTC');
                }
            }
            // END debug only

            if (altana.localStorageExists) { // IF Local storage exists, may not on some browsers

                altana.acceptedDisclaimer = (localStorage.getItem('acceptedDisclaimer') === 'true');
                altana.acceptedDateTimeUTC = new Date(localStorage.getItem('acceptedDateTimeUTC'));


                if (altana.acceptedDisclaimer) { // acceptedDisclaimer exists
                    var today = new Date();
                    var diffMs = (today - altana.acceptedDateTimeUTC); // milliseconds difference
                    var diffDays = diffMs / (1000 * 60 * 60 * 24); // days

                    if (diffDays > disclaimerAcceptanceLifeDays) {
                        altana.acceptedDisclaimer = false;
                    }

                } // end acceptedDisclaimer exists
                else { // acceptedDisclaimer NOT exists
                    altana.acceptedDisclaimer = false;
                } // end acceptedDisclaimer NOT exists

                if (altana.acceptedDisclaimer == false) {
                    altana.openDisclaimerPopUp();
                }
            } // end Local storage exists
            else { // Local storage NOT exists so have to ask every time since have no ability to store
                // can add session permanence via global JS variable
                altana.openDisclaimerPopUp();
            } // end Local storage NOT exists
        } else {
            if (debug) {
                console.log("Page DOES NOT require disclaimer to be accepted");
            }
        }
    };
})(window.altana = window.altana || {});