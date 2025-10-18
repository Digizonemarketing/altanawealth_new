(function(altana, undefined) {
    window.addEventListener('DOMContentLoaded', function() {

        var anchors = document.getElementsByTagName("a");

        for (var i = anchors.length - 1; i >= 0; i--) {
            if (anchors[i].href.includes('mailto'))
                anchors[i].classList.add('mailto');
        }
    });
})(window.altana = window.altana || {});