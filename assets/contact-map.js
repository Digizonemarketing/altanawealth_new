(function(altana, undefined) {

    function drawMap(location, element) {


        var noPoi = [{
            featureType: "poi",
            stylers: [{
                visibility: "off"
            }]
        }];

        var mapOptions = {
            center: location.coords,
            zoom: 17,
            styles: noPoi,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        location.map = new google.maps.Map(document.getElementById(element), mapOptions);

        var image = 'https://www.altanawealth.com/assets/altana-location-icon.png';

        location.marker = new google.maps.Marker({
            position: location.coords,
            title: location.localAddress,
            map: location.map,
            icon: image
        });

    };

    altana.loadMaps = function() {
        altana.locations = {
            london: {},
            monaco: {}
        };

        altana.locations.london.coords = new google.maps.LatLng(51.5154463, -0.13850920000004407);
        altana.locations.london.localAddress = "175 Oxford Street, London, W1D 2JH, United Kingdom";
        altana.locations.monaco.coords = new google.maps.LatLng(43.74234, 7.427373999999986);
        altana.locations.monaco.localAddress = "33 Avenue St Charles, 98000 Monaco";

        drawMap(altana.locations.london, "mapLondon");
        drawMap(altana.locations.monaco, "mapMonaco");
    }

})(window.altana = window.altana || {});