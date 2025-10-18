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