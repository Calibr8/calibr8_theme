<?php
/**
 * @file
 * theme-settings.php
 * @see ./includes/settings.inc
 */

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\Component\Serialization\Json;
use GuzzleHttp\Exception\RequestException;


/**
 * Implements hook_form_FORM_ID_alter().
 */
function calibr8_theme_form_system_theme_settings_alter(&$form, FormStateInterface $form_state, $form_id = NULL) {

  // Vertical tabs

  $form['calibr8_theme'] = [
    '#type' => 'vertical_tabs',
    '#prefix' => '<h2><small>' . t('Calibr8 Settings') . '</small></h2>',
    '#weight' => -10,
  ];

  // Visual aids group
  $form['visual_aids'] = [
    '#type' => 'details',
    '#title' => ('Visual Aids'),
    '#group' => 'calibr8_theme',
  ];

  // Introduction
  $intro_text = 'Make sure these settings are turned off on production environments.';
  $form['visual_aids']['intro'] = [
    '#type' => 'markup',
    '#markup' => '<div class="theme-settings-intro"><p>' . t($intro_text) . '</p></div>',
  ];

  // Grid columns
  $form['visual_aids']['grid_columns'] = [
    '#type' => 'checkbox',
    '#title' => t('Grid columns'),
    '#default_value' => theme_get_setting('grid_columns'),
    '#description' => t("Press \"G\" to toggle. This shows the CSS grid on top of the page. This can be useful when aligning content to the grid."),
  ];
  // Breakpoint indicator
  $form['visual_aids']['breakpoint_indicator'] = [
    '#type' => 'checkbox',
    '#title' => t('Breakpoint indicator'),
    '#default_value' => theme_get_setting('breakpoint_indicator'),
    '#description' => t("Adds a small box at the bottom of the browser window that displays the current breakpoint. This can be very useful when writing media queries for a responsive website."),
  ];
  // Headings indicator
  $form['visual_aids']['headings_indicator'] = [
    '#type' => 'checkbox',
    '#title' => t('Headings indicator'),
    '#default_value' => theme_get_setting('headings_indicator'),
    '#description' => t("Press \"H\" to toggle. Shows the hierarchy of your headers."),
  ];

  // Bookmark icons group
  $form['bookmark_icons'] = [
    '#type' => 'details',
    '#title' => ('Bookmark icons'),
    '#group' => 'calibr8_theme',
  ];

  // Intro
  $test_url = 'http://realfavicongenerator.net/favicon_checker?protocol=http&site=' . $_SERVER['HTTP_HOST'];
  $intro_text = 'All bookmark icons are placed in <em>calibr8_subtheme/bookmark-icons</em>.';
  $label = 'Test bookmark icons';
  $form['bookmark_icons']['intro'] = [
    '#type' => 'markup',
    '#markup' => '<div class="theme-settings-intro"><p>' . t($intro_text) . '</p>' . '<div class="test-link"><a class="button" href="' . $test_url . '" target="_blank">' . t($label) . '</a></div></div>',
  ];
  // Windows 8 and 10 Tile color
  $form['bookmark_icons']['windows_tile_color'] = [
    '#type' => 'textfield',
    '#title' => t('Windows tile color'),
    '#default_value' => theme_get_setting('windows_tile_color'),
    '#description' => t("The background of the windows tile. RGB value; for example <em>#85c441</em>."),
  ];
  // Android theme color
  $form['bookmark_icons']['android_theme_color'] = [
    '#type' => 'textfield',
    '#title' => t('Android theme color'),
    '#default_value' => theme_get_setting('android_theme_color'),
    '#description' => t("Starting with Android Lollipop, you can customize the color of the task bar in the switcher. RGB value; for example <em>#85c441</em>."),
  ];

}
