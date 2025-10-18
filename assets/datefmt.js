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