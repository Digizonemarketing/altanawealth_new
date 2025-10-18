(function(altana, undefined) {
  window.teamtailorSettings = {
      widgetPosition: 'bottom-right',
      color: '#b89d18',
      company: 'altanawealth.teamtailor.com'
  }

  var w = window;
  var d = document;

  function l() {
      var s = d.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = '//' + w.teamtailorSettings.company + '/widget';
      var x = d.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
  }
  if (w.attachEvent) {
      w.attachEvent('onload', l);
  } else {
      w.addEventListener('load', l, false);
  }
})(window.altana = window.altana || {});