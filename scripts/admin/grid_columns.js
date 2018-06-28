/**
 * @file
 */

(function ($) {

// Init grid columns

  if ($('body.grid-columns').length) {
    $('body').append('<div id="grid-columns-container" style="display: none;"><div class="container"><div class="row"></div></div></div>');
    for (var i = 1; i <= 64; i++) {
      $('#grid-columns-container .row').append('<div class="col col-1"><span></span></div>');
    }
    $('body').bind('keypress', function (e) {
      // check if not in textfield / textarea / ...
      if (!$(':focus').length) {
        switch (e.charCode) {
          case 103: // 'g'
          case 71: // 'G'
            console.log('toggle grid');
            $('#grid-columns-container').toggle();
            break;
        }
      }
    });
  }

})(jQuery);
