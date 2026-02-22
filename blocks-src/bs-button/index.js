/**
 * Bootstrap button block JS.
 * 
 * This block was created by ChatGPT 5.2 Codex.
 *
 * @package rundizstrap-companion
 * @since 0.0.1
 */

import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';

import Edit from './edit.js';


registerBlockType(metadata.name, {
    edit: Edit,
});
