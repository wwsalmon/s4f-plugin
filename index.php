<?php
/**
 * Plugin Name: Stem4Free Site Specific Plugin
 * Description: Gutenberg blocks and other functionality for stem4free.org, to be used with accompanying theme.
 * Version: 0.0.1
 * Author: Samson Zhang
 * Author URI: https://www.samsonzhang.com/
 */

function enqueue_blocks(){
	wp_enqueue_script("blocks",plugin_dir_url(__FILE__) . "/build/index.js", array('wp-blocks', 'wp-block-editor', 'wp-components'));
}

add_action("enqueue_block_editor_assets", "enqueue_blocks");