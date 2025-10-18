var strapLines = [
    { strap1: 'Using sophisticated tools', strap2: 'We simplify investing and reduce risk'},
    { strap1: 'Markets change', strap2: 'We adapt'},
    { strap1: 'Seeking out alpha', strap2: 'We find opportunity where others fail to look'},
    { strap1: 'True alignment of interest', strap2: 'We always co-invest'},
];



function addStrapLines(element, index) {

    element.classList.add("hero" + (index + 1));

    var newNode = document.createElement("div");
    var strapBoxID = element.appendChild(newNode);
    strapBoxID.classList.add("hero-strap-box");

    newNode = document.createElement("h1");
    content = document.createTextNode(strapLines[index].strap1);
    newNode.appendChild(content);
    var strap1ID = strapBoxID.appendChild(newNode);
    strap1ID.classList.add("hero-strap");
    strap1ID.classList.add("hero-strap01");

    newNode = document.createElement("h1");
    content = document.createTextNode(strapLines[index].strap2);
    newNode.appendChild(content);
    var strap2ID = strapBoxID.appendChild(newNode);
    strap2ID.classList.add("hero-strap");
    strap2ID.classList.add("hero-strap02");


    newNode = document.createElement("h1");
    content = document.createTextNode("Altana Wealth");
    newNode.appendChild(content);
    var titleID = element.appendChild(newNode);
    titleID.classList.add("hero-title");
}


window.addEventListener('DOMContentLoaded', function() {


    var imgIDs = document.getElementById("hero-new").getElementsByTagName("FIGURE");

    for (var i = 0; i < imgIDs.length; i++) {
        addStrapLines(imgIDs[i], i);
        }
});
