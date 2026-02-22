/**
 * Bootstrap navbar toggler button block edit component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import {
    TextControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

import RundizStrapCompanionKeyValueCtrl from '../../assets/js/blocks/shared/rundizstrap-companion-keyvalue-control.js';

import rundizstrap_companion_attribute_to_props from '../../assets/js/blocks/shared/rundizstrap-companion-attributes.js';

import { rundizstrap_companion_sanitize_html_class_list } from '../../assets/js/blocks/shared/rundizstrap-companion-sanitize.js';


export default function Edit({ attributes, setAttributes }) {
    const {
        dataAttributes,
        ariaAttributes,
        iconClassName,
        iconDataAttributes,
        iconAriaAttributes
    } = attributes;
    const sanitizedIconClassName = rundizstrap_companion_sanitize_html_class_list(iconClassName || '');
    const blockProps = useBlockProps({
        className: 'navbar-toggler',
        type: 'button',
        ...rundizstrap_companion_attribute_to_props(dataAttributes, 'data-'),
        ...rundizstrap_companion_attribute_to_props(ariaAttributes, 'aria-'),
    });
    const iconProps = {
        className: `navbar-toggler-icon ${sanitizedIconClassName}`.trim(),
        ...rundizstrap_companion_attribute_to_props(iconDataAttributes, 'data-'),
        ...rundizstrap_companion_attribute_to_props(iconAriaAttributes, 'aria-'),
    };

    // Helper to check if objects are empty
    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;

    return (
        <>
            <InspectorControls>
                <ToolsPanel
                    label={__('Button Settings', 'rundizstrap-companion')}
                    resetAll={() => setAttributes({
                        dataAttributes: {},
                        ariaAttributes: {}
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(dataAttributes)}
                        label={__('Data attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ dataAttributes: {} })}
                        isShownByDefault
                    >
                        <RundizStrapCompanionKeyValueCtrl
                            label={__('Data attributes', 'rundizstrap-companion') + ' '}
                            value={dataAttributes}
                            onChange={(value) => setAttributes({ dataAttributes: value })}
                            prefix="data-"
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(ariaAttributes)}
                        label={__('Aria attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ ariaAttributes: {} })}
                        isShownByDefault
                    >
                        <RundizStrapCompanionKeyValueCtrl
                            label={__('Aria attributes', 'rundizstrap-companion') + ' '}
                            value={ariaAttributes}
                            onChange={(value) => setAttributes({ ariaAttributes: value })}
                            prefix="aria-"
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel
                    label={__('Icon Settings', 'rundizstrap-companion')}
                    resetAll={() => setAttributes({
                        iconClassName: '',
                        iconDataAttributes: {},
                        iconAriaAttributes: {}
                    })}
                >
                    <ToolsPanelItem
                        hasValue={() => iconClassName !== ''}
                        label={__('Icon Additional Class(es)', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ iconClassName: '' })}
                        isShownByDefault
                    >
                        <TextControl
                            label={__('Icon Additional Class(es)', 'rundizstrap-companion')}
                            value={iconClassName}
                            onChange={(value) => setAttributes({ iconClassName: rundizstrap_companion_sanitize_html_class_list(value, true) })}
                            onBlur={() => setAttributes({ iconClassName: rundizstrap_companion_sanitize_html_class_list(iconClassName || '') })}
                            help={__('Add additional classes to the icon span.', 'rundizstrap-companion')}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(iconDataAttributes)}
                        label={__('Icon data attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ iconDataAttributes: {} })}
                        isShownByDefault
                    >
                        <RundizStrapCompanionKeyValueCtrl
                            label={__('Icon data attributes', 'rundizstrap-companion') + ' '}
                            value={iconDataAttributes}
                            onChange={(value) => setAttributes({ iconDataAttributes: value })}
                            prefix="data-"
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !isObjectEmpty(iconAriaAttributes)}
                        label={__('Icon aria attributes', 'rundizstrap-companion')}
                        onDeselect={() => setAttributes({ iconAriaAttributes: {} })}
                        isShownByDefault
                    >
                        <RundizStrapCompanionKeyValueCtrl
                            label={__('Icon aria attributes', 'rundizstrap-companion') + ' '}
                            value={iconAriaAttributes}
                            onChange={(value) => setAttributes({ iconAriaAttributes: value })}
                            prefix="aria-"
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>

            <button {...blockProps}>
                <span {...iconProps}></span>
            </button>
        </>
    );
}// Edit
