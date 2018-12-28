/**
 * @file
 * Breakpoint indicator.
 */
(function ($, Drupal) {

  'use strict';

  var options = $.extend({
    breakpoints: {
      'sm': '',
      'md': '',
      'lg': '',
      'xl': ''
    }
  }, drupalSettings.calibr8);

  // Init breakpoint indicator
  if($('body.breakpoint-indicator').length) {
    $('body').append('<div id="breakpoint-indicator"><span class="pixels"></span><span class="breakpoint"></span></div>');
    $(window).resize(update_breakpoint_indicator);
    update_breakpoint_indicator();
  }

  function update_breakpoint_indicator() {
    var $window_width = $(window).width();
    var $breakpoint = '--';
    for (var key in options.breakpoints) {
      if (!options.breakpoints.hasOwnProperty(key)) continue;
      var mediaquery = options.breakpoints[key];
      if(window.matchMedia(mediaquery).matches) {
        $breakpoint = key;
      }
    }
    $('#breakpoint-indicator span.pixels').html($window_width + 'px' );
    $('#breakpoint-indicator span.breakpoint').html($breakpoint);
  }

})(jQuery, Drupal);