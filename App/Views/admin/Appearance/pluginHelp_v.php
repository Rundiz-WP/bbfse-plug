<?php
/**
 * Plugin help page.
 * 
 * @package bbfse-plug
 * @since 0.0.1
 */


if (!defined('ABSPATH')) {
    exit();
}

?>
<div class="wrap bbfse-plug-appearance-help">
    <h1><?php esc_html_e('BBFSE Plug help', 'bbfse-plug'); ?></h1>

    <div class="rd-settings-tabs tabs-vertical">
        <ul class="tab-pane">
            <li><a href="#tabs-01"><span class="tab-text"><?php esc_html_e('Navbar', 'bbfse-plug'); ?></span></a></li>
            <?php
            /**
             * Setup help tab pane in the "BBFSE Plug" plugin help page.
             * 
             * @since 0.0.1
             * @param array $tabPanes The associative array of tab panes 
             *              where key is unique name (use alpha-numeric, dash, underscore only) 
             *              and value is tab name.
             */
            $bsfsePluginAdditionalTabs = apply_filters('bbfse_plug_help_tabpane', []);
            if (is_array($bsfsePluginAdditionalTabs) || is_iterable($bsfsePluginAdditionalTabs)) {
                foreach ($bsfsePluginAdditionalTabs as $key => $value) {
                    echo '<li>';
                    echo '<a href="#' . sanitize_html_class($key) . '">';
                    echo '<span class="tab-text">' . $value . '</span>';
                    echo '</a>';
                    echo '</li>' . PHP_EOL;
                }// endforeach;
                unset($key, $value);
            }// endif; $bsfsePluginAdditionalTabs
            ?> 
        </ul>
        <div class="tab-content">
            <div id="tabs-01">
                <p><?php esc_html_e('The navbar consists of 4 parts.', 'bbfse-plug'); ?></p>
                <ol>
                    <li><?php esc_html_e('Bootstrap navbar container', 'bbfse-plug'); ?></li>
                    <li><?php esc_html_e('Bootstrap navbar toggler button', 'bbfse-plug'); ?></li>
                    <li><?php esc_html_e('Bootstrap navbar responsive wrapper', 'bbfse-plug'); ?></li>
                    <li><?php esc_html_e('Bootstrap navbar navigation', 'bbfse-plug'); ?></li>
                </ol>
                <h2><?php esc_html_e('Navbar brand', 'bbfse-plug'); ?></h2>
                <p><?php 
                printf(
                    /* translators: %1$s navbar-brand class. */
                    esc_html__('To use %1$s, you can use WordPress core row block and add class %1$s to it. Then you can add site logo, site title into row.', 'bbfse-plug'),
                    '<code>navbar-brand</code>'
                ); 
                ?></p>
                <h2><?php esc_html_e('Navbar dropdown', 'bbfse-plug'); ?></h2>
                <p><?php 
                printf(
                    /* translators: %1$s dropdown divider class, %2$s Navigation. */
                    esc_html__('To use dropdown menu divider, add class %1$s to sub menu item in %2$s in the site editor.', 'bbfse-plug'),
                    '<code>dropdown-divider</code>',
                    '<strong>' . esc_html__('Navigation', 'bbfse-plug') . '</strong>'
                ); 
                ?></p>
                <p><?php 
                printf(
                    /* translators: %1$s dropdown header class, %2$s Navigation. */
                    esc_html__('To use dropdown menu header, add class %1$s to sub menu item in %2$s in the site editor.', 'bbfse-plug'),
                    '<code>dropdown-header</code>',
                    '<strong>' . esc_html__('Navigation', 'bbfse-plug') . '</strong>'
                ); 
                ?></p>
            </div><!-- #tabs-01 -->
            <?php
            if (is_array($bsfsePluginAdditionalTabs) || is_iterable($bsfsePluginAdditionalTabs)) {
                foreach ($bsfsePluginAdditionalTabs as $key => $value) {
                    echo '<div id="' . sanitize_html_class($key) . '">' . PHP_EOL;
                    /**
                     * Display help tab content in the "BBFSE Plug" plugin help page.
                     * 
                     * If your defined tab pane array key is `my_plugin_help_tab_01`
                     * then the hook can be `bbfse_plug_help_tabcontent_my_plugin_help_tab_01`.
                     * 
                     * @since 0.0.1
                     */
                    do_action('bbfse_plug_help_tabcontent_' . $key);
                    echo PHP_EOL;
                    echo '</div>' . PHP_EOL;
                }// endforeach;
                unset($key, $value);
            }// endif; $bsfsePluginAdditionalTabs
            unset($bsfsePluginAdditionalTabs);
            ?> 
        </div><!-- .tab-content -->
    </div><!-- .rd-settings-tabs -->
</div><!-- .wrap -->