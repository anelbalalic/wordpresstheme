<?php get_header(); ?>



<?php if ( have_posts() ) : ?>
    <?php while ( have_posts() ) : the_post(); ?>
        <h2>
            <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
                <?php the_title(); ?>
            </a>
        </h2>

        <?php _themename_post_meta(); ?>

        <div>
            <?php the_excerpt(); ?>
        </div>

        <?php _themename_readmore_link(); ?>
    <?php endwhile; ?>

    <?php the_posts_pagination(); ?>

<?php do_action( '_themename_after_pagination' ); ?>

<?php else : ?>
    <p><?php echo esc_html__('Sorry, no posts matched your criteria', '_themename'); ?></p>
<?php endif; ?>

<?php get_footer(); ?>

