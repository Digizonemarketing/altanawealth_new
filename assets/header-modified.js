// header-modified.js - optimized version
(function(altana, undefined) {
    'use strict';
    
    var pagesModifiedHeader = ['home', 'home-new'];
    
    function addModifiedHeaderIfRequired() {
        var pageName = window.location.pathname.split('/').pop() || 'home';
        if (pagesModifiedHeader.includes(pageName)) {
            document.body.classList.add('header-modified');
        }
    }
    
    // Wait for load instead of DOMContentLoaded
    if (document.readyState === 'loading') {
        window.addEventListener('load', addModifiedHeaderIfRequired);
    } else {
        addModifiedHeaderIfRequired();
    }
})(window.altana = window.altana || {});

