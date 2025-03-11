<?php
/*
Plugin Name: Losowe Ogłoszenia
Plugin URI: https://example.com
Description: Wtyczka do wyświetlania losowego ogłoszenia na początku każdego posta z priorytetami.
Version: 1.0
Author: Dorota Ptasznik, Karol Zając
Author URI: https://example.com
License: GPL2
*/

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

function wp_ads_add_priority_meta_box()
{
    add_meta_box(
        'wp_ads_priority',
        'Priorytet Ogłoszenia',
        'wp_ads_priority_meta_box_callback',
        'wp_ad',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'wp_ads_add_priority_meta_box');

function wp_ads_priority_meta_box_callback($post)
{
    $priority = get_post_meta($post->ID, '_wp_ad_priority', true);
    ?>
    <label for="wp_ad_priority">Wybierz priorytet:</label>
    <select name="wp_ad_priority" id="wp_ad_priority">
        <option value="low" <?php selected($priority, 'low'); ?>>Niski</option>
        <option value="medium" <?php selected($priority, 'medium'); ?>>Średni</option>
        <option value="high" <?php selected($priority, 'high'); ?>>Wysoki</option>
    </select>
    <?php
}

function wp_ads_save_priority_meta_box($post_id)
{
    if (array_key_exists('wp_ad_priority', $_POST)) {
        update_post_meta($post_id, '_wp_ad_priority', sanitize_text_field($_POST['wp_ad_priority']));
    }
}
add_action('save_post', 'wp_ads_save_priority_meta_box');

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
    $priority = get_post_meta($selected_ad->ID, '_wp_ad_priority', true);

    $class = 'wp-ads-box';
    if ($priority == 'high') {
        $class .= ' wp-ads-high';
    } elseif ($priority == 'medium') {
        $class .= ' wp-ads-medium';
    } else {
        $class .= ' wp-ads-low';
    }

    $ad_html = '<div class="' . esc_attr($class) . '">'
        . '<h3>' . esc_html(get_the_title($selected_ad)) . '</h3>'
        . wpautop($selected_ad->post_content)
        . '</div>';

    return $ad_html . $content;
}
add_filter('the_content', 'wp_ads_display_before_content', 5);

function wp_ads_enqueue_styles()
{
    wp_enqueue_style('wp-random-ads-style', plugin_dir_url(__FILE__) . 'plugin1.css');
}
add_action('wp_enqueue_scripts', 'wp_ads_enqueue_styles');

?>