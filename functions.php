<?php


require_once( get_template_directory() . '/lib/helpers.php' );

require_once( get_template_directory() . '/lib/enqueue-assets.php' );

function after_pagination() {
    echo 'asdasdasddsa';
}

add_action( '_themename_after_pagination', 'after_pagination'  );

