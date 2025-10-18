(function(altana, undefined) {
    window.addEventListener('DOMContentLoaded', function() {
        altana.signUpCloseButtonClick();
        document.getElementById('sign-up-close').addEventListener("click", altana.signUpCloseButtonClick);
        var signUpButton = document.getElementById('sign-up');
        if (signUpButton != undefined) {
            signUpButton.addEventListener("click", altana.signUpButtonClick)
        };
    });

    altana.signUpButtonClick = function() {
        document.getElementById('sign-up-page').style.display = 'block'; // show
        document.getElementById('cover').style.display = 'block';
    }

    altana.signUpCloseButtonClick = function() {
        document.getElementById('sign-up-page').style.display = 'none';
        document.getElementById('cover').style.display = 'none';
    }
})(window.altana = window.altana || {});