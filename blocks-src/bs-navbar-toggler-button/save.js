/**
 * Bootstrap navbar toggler button block save component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import { useBlockProps } from '@wordpress/block-editor';

import rundizstrap_companion_attribute_to_props from '../../assets/js/blocks/shared/rundizstrap-companion-attributes.js';

import { rundizstrap_companion_sanitize_html_class_list } from '../../assets/js/blocks/shared/rundizstrap-companion-sanitize.js';


export default function Save({ attributes }) {
    const {
        dataAttributes,
        ariaAttributes,
        iconClassName,
        iconDataAttributes,
        iconAriaAttributes
    } = attributes;
    const sanitizedIconClassName = rundizstrap_companion_sanitize_html_class_list(iconClassName || '');
    const blockProps = useBlockProps.save({
        className: 'navbar-toggler',
        type: 'button'
    });

    const dataProps = rundizstrap_companion_attribute_to_props(dataAttributes, 'data-');
    const ariaProps = rundizstrap_companion_attribute_to_props(ariaAttributes, 'aria-');

    // Merge outer attributes into blockProps
    Object.assign(blockProps, dataProps, ariaProps);

    const iconDataProps = rundizstrap_companion_attribute_to_props(iconDataAttributes, 'data-');
    const iconAriaProps = rundizstrap_companion_attribute_to_props(iconAriaAttributes, 'aria-');
    const iconProps = {
        className: `navbar-toggler-icon ${sanitizedIconClassName}`.trim(),
        ...iconDataProps,
        ...iconAriaProps
    };

    return (
        <button {...blockProps}>
            <span {...iconProps}></span>
        </button>
    );
}// save
