window.addEventListener('DOMContentLoaded', function() {
    var signUpButton = document.getElementById('sign-up');
    if (signUpButton != undefined) {signUpButton.addEventListener("click", signUpButtonClick)};
});

function signUpButtonClick(){
  window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us5.list-manage.com","uuid":"66c2ca83391bb43f78ad7c239","lid":"d442c380d9","uniqueMethods":true}) })
}