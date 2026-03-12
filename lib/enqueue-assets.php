<?php

    function _themename_enqueue_assets() {
    wp_enqueue_style('_themename-style', get_template_directory_uri() . '/dist/assets/css/bundle.css', '1.0','all');

    wp_enqueue_script('_themename-scripts', get_template_directory_uri() . '/dist/assets/js/bundle.js', array('jquery'), '1.0', true);
}

add_action('wp_enqueue_scripts', '_themename_enqueue_assets');


function _themename_enqueue_admin_assets() {
    wp_enqueue_style('_themename-admin-style', get_template_directory_uri() . '/dist/assets/css/admin.css', '1.0','all');

    wp_enqueue_script('_themename-admin-scripts', get_template_directory_uri() . '/dist/assets/js/admin.js', array(), '1.0', true);


}

add_action('admin_enqueue_scripts', '_themename_enqueue_admin_assets');
