<?php


require_once( get_template_directory() . '/lib/helpers.php' );

require_once( get_template_directory() . '/lib/enqueue-assets.php' );

function after_pagination() {
    echo 'asdasdasddsa';
}

add_action( '_themename_after_pagination', 'after_pagination'  );



add_action( 'pre_get_posts', 'function_to_add', 10,2  );

function function_to_add($query) {
      if($query->is_main_query()) {
          $query->set('posts_per_page', 2);
      }

}

function no_posts_text($text){
      return esc_html__('No posts','asdasdas-child');
}

add_filter('_themename_no_posts_text', 'no_posts_text');

function filter_title($title){
     return 'Filtered ' . $title;
}

add_filter('the_title', 'filter_title');