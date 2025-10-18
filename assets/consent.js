function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

$(document).ready(function() {
    const altanawealth_domain = "altanawealth.com";

    if (checkCookie() == true) {
        console.log("cookie exists");
        $("#consent_popup").hide();
    }
    else {
        console.log("cookie does not exist");
        $("#consent_popup").show();
        $("#consent_popup .continue").prop("disabled", true);
        $("#seek_advice").hide();
        $("#disclaimer-container").hide();


        $("#disclaimer-container").bind("scroll", function () {
            const disclaimerContainer = document.getElementById("disclaimer-container");
            
            console.log(disclaimerContainer.scrollHeight);
            console.log(disclaimerContainer.scrollTop);
            console.log(disclaimerContainer.clientHeight);

            if (
                Math.ceil(
                    disclaimerContainer.scrollHeight - disclaimerContainer.scrollTop - disclaimerContainer.clientHeight
                ) < 10 &&
                $("#consent_popup .continue").prop("disabled") === true
            ) {
                console.log("scrolled to bottom");
                $("#consent_popup .continue").prop("disabled", false);
            }
            
        });

        $("#consent_popup input[type=radio][name=investor_type]").on(
            "change",
            function () {
                const investor_type = $(
                    "#consent_popup input[type=radio][name=investor_type]:checked"
                ).val();

                if (investor_type === "non-professional") {
                    $("#seek_advice").show();
                    $("#disclaimer-container").hide();
                } else {
                    $("#seek_advice").hide();
                    $("#disclaimer-container").show();
                }

                setDislaimer();
            }
        );

        $("#consent_popup .continue").on("click", function () {
            setCookie();

            checkRedirect();

            $("#consent_popup").fadeOut();
            setTimeout(function () {
                $(".modal-backdrop").hide();
                $("body").removeClass("modal-open");
                $("body").css("padding-right", "");
                $("html").removeClass("hidden-class");
            }, 1000);
        });
    }

    function setCookie() {
        const investor_type = $(
            "#consent_popup input[type=radio][name=investor_type]:checked"
        ).val();
        const region = 'united-kingdom';
        const d = new Date();
        d.setTime(d.getTime() + 90 * 24 * 60 * 60 * 1000);

        const expires = "expires=" + d.toUTCString();
        const path = "path=/";
        const domain = "domain=" + altanawealth_domain;

        document.cookie = ["consent-disclaimer=true", expires, path, domain].join(
            ";"
        );
        document.cookie = [
            "investor_type=" + investor_type,
            expires,
            path,
            domain,
        ].join(";");
        document.cookie = ["region=" + region, expires, path, domain].join(";");
    }

    function setDislaimer() {
        const disclaimerContainer = document.getElementById("disclaimer-container");
        disclaimerContainer.scrollTop = 0;
        $("#consent_popup .continue").prop("disabled", true);

        const investor_type = $(
            "#consent_popup input[type=radio][name=investor_type]:checked"
        ).val();
        const region = 'united-kingdom';

        $("#consent_popup .disclaimer").children().addClass("hidden");
        const div = $(
            "#consent_popup .disclaimer div[data-investor-type=" +
            investor_type +
            "][data-region=" +
            region +
            "]"
        );
        if (div.length) div.removeClass("hidden");
    }

    function checkCookie() {
        const region = getCookie("region");
        const investor_type = getCookie("investor_type");
        console.log(region, investor_type);
        console.log(window.location.hostname);
        console.log(window.location.pathname);

        if (Boolean(region) && Boolean(investor_type)) {
            return true;
        }
        else if(window.location.pathname == '/careers') {
            return true;
        }
        else {
            return false;
        }
    }

    function checkRedirect() {
        const region = getCookie("region");
        const investor_type = getCookie("investor_type");
        console.log(region, investor_type);
        console.log(window.location.hostname);

        if (Boolean(region) && Boolean(investor_type)) {
            const pathAndQuery = window.location.pathname + window.location.search;

            if (
                window.location.hostname === altanawealth_domain &&
                region !== "rest-of-the-world"
            )
                return window.location.replace(
                    "https://www." + altanawealth_domain + pathAndQuery
                );

            // if (
            //     window.location.hostname === altanawealth_pro_site &&
            //     region === "rest-of-the-world"
            // )
            //     return window.location.replace(
            //         "https://" + arcus_main_site + pathAndQuery
            //     );
        }
    }
});
