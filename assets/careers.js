(function(altana, undefined) {
  $(document).ready(function() {
    $('.markdown-block .sqs-block-content h4').addClass('ui-closed').css('cursor', 'pointer');
    $(".markdown-block .sqs-block-content h4").nextUntil("h4").slideToggle();
    $(".markdown-block .sqs-block-content h4").click(function() {
      $(this).nextUntil("h4").slideToggle();
      $(this).toggleClass('ui-closed ui-open');
    });
  });
})(window.altana = window.altana || {});