<?php
/**
 * Upgrader's class view file.
 * 
 * @package plugin-template-package
 */


if (!defined('ABSPATH')) {
    exit();
}

?>
<div class="wrap">
    <h1><?php esc_html_e('Manual update', 'plugin-template'); ?></h1>

    <div class="form-result-placeholder"></div>

    <form method="post">
        <?php wp_nonce_field(); ?> 
        <p><?php printf(
            // translators: %d Number of total actions.
            esc_html(__('There are total %d actions for this manual update, please continue step by step.', 'plugin-template')), 
            count($manualUpdateClasses) // phpcs:ignore
        ); ?></p>
        <p><?php printf(
            /* translators: %1$s The number of already run action, %2$d The number of total actions. */
            esc_html(__('You are running %1$s of %2$d.', 'plugin-template')), 
            '<span class="already-run-total-action">0</span>', 
            count($manualUpdateClasses) // phpcs:ignore
        ); ?></p>
        <button class="button button-primary manual-update-action-button" type="button"><?php esc_html_e('Start', 'plugin-template'); ?></button> <span class="manual-update-action-placeholder"></span>
    </form>
</div>
