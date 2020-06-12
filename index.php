<?php
/**
 * Plugin Name: Stem4Free Site Specific Plugin
 * Description: Gutenberg blocks and other functionality for stem4free.org, to be used with accompanying theme.
 * Version: 0.0.1
 * Author: Samson Zhang
 * Author URI: https://www.samsonzhang.com/
 */

function s4f_register_test_block(){
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

    wp_register_script(
        'test-block',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    register_block_type( 's4f-plugin/test-block', array(
        'style' => 'test-block',
        'editor_style' => 'test-block-editor',
        'editor_script' => 'test-block',
    ) );
}

add_action("init", "s4f_register_test_block");