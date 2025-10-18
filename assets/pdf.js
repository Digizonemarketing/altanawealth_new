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