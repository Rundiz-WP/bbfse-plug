/**
 * Customizable div block save component.
 *
 * @package rundizstrap-companion
 * @since 0.0.1
 */

import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

import rundizstrap_companion_attribute_to_props from '../../assets/js/blocks/shared/rundizstrap-companion-attributes.js';
import { sanitizeTagName } from '../../assets/js/blocks/shared/tagBlockLevel.js';

const DEFAULT_TAG_NAME = 'div';

/**
 * Save component for customizable div block.
 *
 * @param {Object} props Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} The saved element.
 */
export default function Save({ attributes }) {
    const {
        tagName,
        accesskey,
        lang,
        role,
        tabindex,
        title,
        dataAttributes,
        ariaAttributes,
    } = attributes;
    const Tag = sanitizeTagName(tagName, DEFAULT_TAG_NAME);

    const blockProps = useBlockProps.save({
        ...(accesskey ? { accessKey: accesskey } : {}),
        ...(lang ? { lang } : {}),
        ...(role ? { role } : {}),
        ...(Number.isInteger(tabindex) ? { tabIndex: tabindex } : {}),
        ...(title ? { title } : {}),
        ...rundizstrap_companion_attribute_to_props(dataAttributes, 'data-'),
        ...rundizstrap_companion_attribute_to_props(ariaAttributes, 'aria-'),
    });

    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <Tag {...innerBlocksProps} />;
}
