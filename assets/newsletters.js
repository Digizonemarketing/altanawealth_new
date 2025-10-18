window.addEventListener('DOMContentLoaded', function() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var topID = document.getElementById('newsletters');

    var fund = topID.getAttribute("fund");
    var thisYear = topID.getAttribute("this-year");
    var thisMonthNum = topID.getAttribute("this-month") - 1;


    var newNode = document.createElement("h2");
    newNode.appendChild(document.createTextNode("Newsletters"));
    topID.appendChild(newNode);

    newNode = document.createElement("h3");
    newNode.appendChild(document.createTextNode("Most Recent"));
    topID.appendChild(newNode);

    newNode = document.createElement("a");
    newNode.href = makeURL(fund, monthNames[thisMonthNum], thisYear);
    newNode.appendChild(document.createTextNode(makeTitle(fund, monthNames[thisMonthNum], thisYear)));
    topID.appendChild(newNode);

    newNode = document.createElement("h3");
    newNode.appendChild(document.createTextNode("Archive"));
    topID.appendChild(newNode);

    var i;
    const numToShow = 5;

    i=0;
    var x = 12*thisYear + thisMonthNum + 1 - 1; 
    while (i < numToShow) {

      x--;

      var m = x % 12
      var y = (x - m) / 12;

        newNode = document.createElement("a");
        newNode.href = makeURL(fund, monthNames[m], y);
        newNode.appendChild(document.createTextNode(makeTitle(fund, monthNames[m], y)));
        topID.appendChild(newNode);


      i++;
    }
});

function makeURL(fund, monthName, year) {
    return "https\:\/\/s3\.amazonaws\.com\/cdn\.altanawealth\.com\/public\/" + fund + "\/Newsletters\/UCITS\/" + year + "\/" + fund + "\+UCITS\+Monthly\+Newsletter\+" + monthName + "\+" + year + "\.pdf";
}

function makeTitle(fund, monthName, year) {
    return fund + " UCITS Monthly Newsletter " + monthName + " " + year;
}