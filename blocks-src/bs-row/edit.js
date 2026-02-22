/**
 * Bootstrap row block edit component.
 * 
 * @package rundizstrap-companion
 * @since 0.0.1
 */


import { __ } from '@wordpress/i18n';

import {
    InnerBlocks,
    useBlockProps,
    InspectorControls,
    useInnerBlocksProps,
    store as blockEditorStore,
} from '@wordpress/block-editor';

import {
    SelectControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

import { useRef } from '@wordpress/element';

import { useSelect } from '@wordpress/data';

import RundizStrapCompanionKeyValueCtrl from '../../assets/js/blocks/shared/rundizstrap-companion-keyvalue-control.js';

import { rundizstrap_companion_blockLevelTagNameOptions, rundizstrap_companion_sanitizeTagName } from '../../assets/js/blocks/shared/rundizstrap-companion-tag-block-level.js';


const DEFAULT_TAG_NAME = 'div';


/**
 * Render inspector controls for the block.
 *
 * @param {Object}   props Component props.
 * @param {string}   props.tagName The HTML tag name.
 * @param {Function} props.onSelectTagName `onChange` function for the SelectControl.
 * @return {JSX.Element} The control group.
 */
function GroupEditControls({ tagName, onSelectTagName }) {
    const tagNameOptions = rundizstrap_companion_blockLevelTagNameOptions.map((item) => ({
        label: (item === DEFAULT_TAG_NAME ? __('Default (<div>)', 'rundizstrap-companion') : '<' + item + '>'),
        value: item,
    }));

    return (
        <InspectorControls group="advanced">
            <SelectControl
                __nextHasNoMarginBottom
                label={__('HTML element', 'rundizstrap-companion')}
                value={tagName}
                onChange={onSelectTagName}
                options={tagNameOptions}
            />
        </InspectorControls>
    );
}// GroupEditControls


/**
 * Edit component for Bootstrap row block.
 * 
 * @param {Object}   props Block props.
 * @param {Object}   props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to set attributes.
 * @param {string}   props.clientId Block client ID.
 * @return {JSX.Element} The edit component.
 */
function GroupEdit({ attributes, setAttributes, clientId }) {
    const {
        tagName,
        dataAttributes,
        ariaAttributes,
    } = attributes;
    const TagName = rundizstrap_companion_sanitizeTagName(tagName, DEFAULT_TAG_NAME);

    const { hasInnerBlocks } = useSelect(
        (select) => {
            const { getBlock } = select(blockEditorStore);
            const block = getBlock(clientId);
            return {
                hasInnerBlocks: !!(block && block.innerBlocks.length),
            };
        },
        [clientId]
    );

    // Hooks.
    const ref = useRef();

    const isObjectEmpty = (obj) => Object.keys(obj || {}).length === 0;

    // Merge 'row' class with WordPress auto-generated classes (single-level output).
    const blockProps = useBlockProps({
        ref,
        className: 'row'
    });

    // Default to the regular appender being rendered.
    let renderAppender;
    if (!hasInnerBlocks) {
        // When the block is empty, use the larger button appender.
        renderAppender = InnerBlocks.ButtonBlockAppender;
    }

    // Single-level output: innerBlocksProps applied to the same element as blockProps.
    const innerBlocksProps = useInnerBlocksProps(
        blockProps,
        {
            dropZoneElement: ref.current,
            renderAppender,
        }
    );

    return (
        <>
            <GroupEditControls
                tagName={TagName}
                onSelectTagName={(value) =>
                    setAttributes({ tagName: rundizstrap_companion_sanitizeTagName(value, DEFAULT_TAG_NAME) })
                }
            />
            <InspectorControls>
                <ToolsPanel
                    label={__('Data and Aria Attributes', 'rundizstrap-companion')}
                    resetAll={() => setAttributes({
                        dataAttributes: {},
                        ariaAttributes: {},
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
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
            <TagName {...innerBlocksProps} />
        </>
    );
}// GroupEdit


export default GroupEdit;
