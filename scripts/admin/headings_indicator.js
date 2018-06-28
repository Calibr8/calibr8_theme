/**
 * @file
 * Breakpoint indicator.
 */
(function ($, Drupal) {
  'use strict';

  var headings_visible = false;

  $('body').bind('keypress', function (e) {
    // check if not in textfield / textarea / ...
    if (!$(':focus').length) {
      switch (e.charCode) {
        case 104: // 'h'
        case 72: // 'H'
          toggleHeadings();
          break;
      }
    }
  });

  function toggleHeadings() {
    console.log('toggle headings');
    if (!headings_visible) {
      showHeadings();
    }
    else {
      hideHeadings();
    }
  }

  var all_elements;
  var current_tagname = '';
  var previous_depth = 0;
  var depth_log = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0); // also stores
                                                        // non-existing H0

  function showHeadings() {
    headings_visible = true;
    all_elements = $('*');
    current_tagname = '';
    previous_depth = 0;
    depth_log = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);

    $.each(all_elements, function (index, val) {
      current_tagname = $(val).get(0).tagName.toLowerCase();
      switch (current_tagname) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':

          // current vars
          var depth = parseInt(current_tagname.substring(1));
          var text = $(val).text();

          // increment depth_log
          if (depth >= previous_depth) {
            // going deeper
            depth_log[depth]++;
          }
          else if (depth < previous_depth) {
            // going shallower
            depth_log[depth]++;
            for (var i = depth + 1; i <= depth_log.length - 1; i++) {
              depth_log[i] = 0;
            }
          }

          // create id string
          var id = '';
          for (var i = 1; i <= depth; i++) {
            id += depth_log[i] + '.';
          }

          // keep depth
          previous_depth = depth;

          // log
          var console_output = current_tagname + ' -- ' + id + ' ';
          var spaces = 13 - id.length;
          for (var i = 1; i <= spaces; i++) {
            console_output += '-';
          }
          console_output += ' ' + text;
          console.log(console_output);

          // add label
          $(val).html(
              '<span class="headings-indicator-tag-wrapper"><span class="headings-indicator-tag headings-indicator-tag--' + current_tagname + '">' + current_tagname + ' | ' + id + '</span>' + $(val).html() + '</span>'
          );
          break;
      }

    });

  }

  function hideHeadings() {
    headings_visible = false;
    $('.headings-indicator-tag-wrapper').contents().unwrap();
    $('.headings-indicator-tag-wrapper').remove();
    $('.headings-indicator-tag').remove();
  }

})(jQuery, Drupal);
