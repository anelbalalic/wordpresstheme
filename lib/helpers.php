<?php
function _themename_post_meta(){
   /* translators: %s: Post Date 8*/
        printf(
                esc_html__('Posted on %s', '_themename'),
                '<a href="' . esc_url(get_permalink()) . '">' .
                '<time datetime="' . esc_attr(get_the_date('c')) . '">' .
                esc_html(get_the_date()) .
                '</time>' .
                '</a>'
        );
    /* translators: %s: Post Author 8*/
    printf(
    /* translators: %s is the author name */
            esc_html__(' By %s', '_themename'),
            '<a href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' .
            esc_html(get_the_author()) .
            '</a>'
    );

    ?>


    <?php
}


function  _themename_readmore_link(){
    ?>

    <a href="<?php echo esc_url(get_permalink()); ?>" title="<?php the_title_attribute(['echo' =>false]) ?>">
        <?php
        /* translators: %s: Post Title 8*/
        printf(
                wp_kses(
                      __('Read More <span class="u-screen-reader-text">About %s</span>', '_themename'),
                        [
                                'span' => [
                                        'class' => []
                                ]
                        ]
                ),
            get_the_title()
    )
        ?>
    </a>

    <?php
}
