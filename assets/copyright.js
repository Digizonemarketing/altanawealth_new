(function(altana, undefined) {
    window.addEventListener('DOMContentLoaded', function() {
        document.getElementById('copyright-year').innerHTML = 1900 + (new Date()).getYear();
    });
})(window.altana = window.altana || {});