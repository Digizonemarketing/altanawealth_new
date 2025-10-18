(function(altana, undefined){

    var modal = null;
    var span = null;

    window.addEventListener('DOMContentLoaded', function() {
        document.getElementById('share-email').addEventListener("click", altana.shareByEmail);
        document.getElementById('share-facebook').addEventListener("click", altana.shareByFacebook);
        document.getElementById('share-linkedin').addEventListener("click", altana.shareByLinkedin);
        document.getElementById('share-messenger-desktop').addEventListener("click", altana.shareByMessengerDesktop);
        document.getElementById('share-messenger-mobile').addEventListener("click", altana.shareByMessengerMobile);
        document.getElementById('share-twitter').addEventListener("click", altana.shareByTwitter);
        document.getElementById('share-whatsapp').addEventListener("click", altana.shareByWhatsapp);
        document.getElementById('share-share').addEventListener("click", altana.shareByShare);
        document.getElementById('follow-email').addEventListener("click", altana.followByEmail);
        document.getElementById('follow-linkedin').addEventListener("click", altana.followByLinkedin);
        document.getElementById('follow-teamtailor').addEventListener("click", altana.followByTeamtailor);

    });

    altana.shareByEmail = function() {
        var href = "mailto:?subject=";
        href = href + "Shared from Altana Wealth";
        href = href + "\&body=Sharing content from Altana Wealth " + window.location.href;
        hrefClick(href);
    };

    altana.followByEmail = function() {
        signUpButtonClick()
    };

    altana.shareByFacebook = function() {
        // https://developers.facebook.com/docs/sharing/reference/feed-dialog/
        /*
            var href="http://www.facebook.com/dialog/feed"
            href = href + "?app_id=972752376410619";
            href = href + "&redirect_uri=" + encodeURI(window.location);
            href = href + "&display=popup";
            href = href + "&link=" + encodeURI(window.location);

            window.open (href, 
                '_blank', 
                'toolbar=no,scrollbars=yes,resizable=no,fullscreen=no,top=50,left=50,width=555,height=615');
        */
        FBShare('share');
    };

    altana.shareByLinkedin = function() {
        var url = window.location.href;
        var text = "A page of interest on Altana Wealth website";
        hrefDialog(encodeURI('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=&summary=' + text + '&source=Altana Wealth'));
    };

    altana.followByLinkedin = function() {
        window.open(encodeURI("https://www.linkedin.com/company/altana-wealth/about/"), '_blank');
    };

    altana.followByTeamtailor = function() {
        window.open(encodeURI("https://altanawealth.teamtailor.com"), '_blank');
    };



    altana.shareByMessengerMobile = function() {
        var url = window.location.href;
        var href = "fb-messenger://share";
        href = href + "?app_id=972752376410619";
        href = href + "&amp;redirect_uri=" + url;
        href = href + "&amp;link=" + url;

        var attributes = [{
            name: "rel",
            value: "noopener"
        }, {
            name: "target",
            value: "_blank"
        }];

        hrefClick(href, attributes);
    };

    altana.shareByMessengerDesktop = function() {
        /*
            var href = "http://www.facebook.com/dialog/send";
            href = href + "?app_id=972752376410619";
            href = href + "&redirect_uri=" + encodeURI(window.location);
            href = href + "&link=" + encodeURI(window.location);
            href = href + "&display=popup";


            window.open (href, 
                '_blank', 
                'toolbar=no,scrollbars=yes,resizable=no,fullscreen=no,top=50,left=50,width=555,height=615');
        */
        FBShare('share');

    };

    function FBShare(method) {
        FB.ui({
            method: method,
            href: window.location.href
        }, function(response) {});

    }
    altana.shareByTwitter = function() {
        var url = window.location.href;
        var hashtags = "altanawealth,altana";
        var text = "A page of interest on Altana Wealth website";
        hrefDialog(encodeURI('https://twitter.com/intent/tweet?text=' + text + '\&url=' + url + '\&hashtags=' + hashtags));
    }
    altana.shareByWhatsapp = function() {
        var url = window.location.href;
        var shareText = "A page of interest on Altana Wealth website";
        var attributes = [{
            name: "data-action",
            value: "share/whatsapp/share"
        }, {
            name: "target",
            value: "_blank"
        }];

        var href = encodeURI('whatsapp://send?text=' + shareText + ' ' + url);

        hrefClick(href, attributes);
    };
    altana.shareByShare = function() {
        var copyText = document.createElement("textarea");
        document.body.appendChild(copyText);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        copyText.value = encodeURI(window.location.href);
        copyText.select();
        document.execCommand("copy");

        // Get the modal
        modal = document.getElementById("copyModal");
        // Get the <span> element that closes the modal
        span = document.getElementsByClassName("close")[0];

        var a = document.getElementById("copy-text")
        a.innerHTML = window.location.href;
        a.href = copyText.value;
        modal.style.display = "block";

        document.body.removeChild(copyText);

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    };
    function hrefDialog(href) {

        window.open(href,
            '_blank',
            'toolbar=no,scrollbars=yes,resizable=no,fullscreen=no,top=50,left=50,width=550,height=250');
    }
    function hrefClick(href, attributes) {

        if (typeof attributes === 'undefined') {
            attributes = [];
        }

        var a = document.createElement("a");

        a.href = encodeURI(href);
        a.href = href;

        for (var i = 0; i < attributes.length; i++) {
            a.setAttribute(attributes[i].name, attributes[i].value);
        }
        a.click();
    }
})(window.altana = window.altana || {});