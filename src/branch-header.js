const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { TextControl } = wp.components;
// import {registerBlockType} from "@wordpress/blocks";
// import {InspectorControls} from "@wordpress/block-editor";
// import {TextControl} from "@wordpress/components";

registerBlockType( 's4f-plugin/branch-header', {
    title: 'S4F Branch Header',
    icon: 'universal-access-alt',
    category: 'layout',
    attributes: {
        branchTitle: {
            type: 'string'
        },
        stateCode: {
            type: "string"
        }
    },
    edit: (props) => {
        const { attributes: { branchTitle, stateCode }, setAttributes, className } = props;

        const onChangeBranchTitle = ( newBranchTitle ) => {
            setAttributes( { branchTitle: newBranchTitle } );
        };

        const onChangeStateCode = (newStateCode) => {
            setAttributes({stateCode: newStateCode === undefined ? "none" : newStateCode})
        };

        return (
            <div>
                {
                    <InspectorControls>
                        <TextControl label="Branch Name" value={branchTitle} onChange={onChangeBranchTitle}></TextControl>
                        <TextControl label="State Code" value={stateCode} onChange={onChangeStateCode}></TextControl>
                    </InspectorControls>
                }
                <>
                    <div className="font-mono opacity-20"><a href="">&lt; All Branches</a></div>
                    <h1 className={`font-mono font-l-responsive stateface-${stateCode}`}>{branchTitle}</h1>
                </>
            </div>
        );
    },
    save: (props) => {
        console.log(props);
        return (
            <>
                <div className="font-mono opacity-20"><a href="">&lt; All Branches</a></div>
                <h1 className={`font-mono font-l-responsive stateface-${props.attributes.stateCode}`}>{props.attributes.branchTitle}</h1>
            </>
        )
    }
});