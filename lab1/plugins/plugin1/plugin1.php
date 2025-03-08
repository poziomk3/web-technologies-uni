<?php
/*
Plugin Name: WP Random Ads
Plugin URI: https://example.com
Description: Wtyczka do wyświetlania losowego ogłoszenia na początku każdego posta.
Version: 1.3
Author: Twoje Imię
Author URI: https://example.com
License: GPL2
*/

// Rejestracja własnego typu postu dla ogłoszeń
function wp_ads_register_post_type()
{
    register_post_type('wp_ad', array(
        'labels' => array(
            'name' => 'Ogłoszenia',
            'singular_name' => 'Ogłoszenie',
            'add_new' => 'Dodaj nowe',
            'add_new_item' => 'Dodaj nowe ogłoszenie',
            'edit_item' => 'Edytuj ogłoszenie',
            'new_item' => 'Nowe ogłoszenie',
            'view_item' => 'Zobacz ogłoszenie',
            'search_items' => 'Szukaj ogłoszeń',
            'not_found' => 'Brak ogłoszeń',
            'not_found_in_trash' => 'Brak ogłoszeń w koszu',
        ),
        'public' => true,
        'show_in_menu' => true,
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-megaphone',
    ));
}
add_action('init', 'wp_ads_register_post_type');

function wp_ads_display_before_content($content)
{
    if (!is_single() || !in_the_loop() || !is_main_query())
        return $content;

    $args = array(
        'post_type' => 'wp_ad',
        'posts_per_page' => 1,
        'orderby' => 'rand',
    );

    $ads = get_posts($args);
    if (empty($ads))
        return $content;

    $selected_ad = reset($ads);
    $ad_html = '<div class="wp-ads-box">'
        . '<h3>' . esc_html(get_the_title($selected_ad)) . '</h3>'
        . wpautop($selected_ad->post_content)
        . '</div>';

    return $ad_html . $content;
}
add_filter('the_content', 'wp_ads_display_before_content', 5);

function wp_ads_custom_css()
{
    echo '<style>
        .wp-ads-box {
            padding: 10px;
            background: #f9f9f9;
            border: 1px solid #ddd;
            margin-bottom: 20px;
        }
        .wp-ads-box h3 {
            margin-top: 0;
            font-size: 1.2em;
            color: #333;
        }
    </style>';
}
add_action('wp_head', 'wp_ads_custom_css');
