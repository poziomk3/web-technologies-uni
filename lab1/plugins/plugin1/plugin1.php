<?php
/*
Plugin Name: My Test Plugins
Plugin URI: https://example.com/
Description: A simple WordPress plugin to test Docker setup.
Version: 1.0
Author: Your Name
Author URI: https://example.com/
License: GPL2
*/

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Include additional functions
include_once plugin_dir_path(__FILE__) . 'includes/my-test-functions.php';

// Add a footer message to posts
function my_test_plugin_footer_message($content) {
    if (is_single()) {
        $content .= '<p style="color: red; font-weight: bold; text-align: center;">This is a test message from My Test Plugin.</p>';
    }
    return $content;
}
add_filter('the_content', 'my_test_plugin_footer_message');

?>
