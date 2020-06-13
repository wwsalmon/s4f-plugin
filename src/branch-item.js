const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { TextControl } = wp.components;

registerBlockType( 's4f-plugin/branch-item', {
    title: 'S4F Branch Item',
    icon: 'universal-access-alt',
    category: 'layout',
    attributes: {
        branchTitle: {
            type: 'string',
            default: "Branch title"
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
                    <a href={"../" + branchTitle.replace(/\s+/g, '-').toLowerCase()}><div className="hover-gray-1 pt-3 pb-3">
                        <h1 className={`font-mono font-l-responsive stateface-${stateCode}`}>{branchTitle}</h1>
                    </div></a>
                    <hr className="opacity-20"></hr>
                </>
            </div>
        );
    },
    save: (props) => {
        const {stateCode, branchTitle} = props.attributes;
        return (
            <>
                <a href={"../" + branchTitle.replace(/\s+/g, '-').toLowerCase()}><div className="hover-gray-1 pt-3 pb-3">
                    <h1 className={`font-mono font-l-responsive stateface-${stateCode}`}>{branchTitle}</h1>
                </div></a>
                <hr className="opacity-20"></hr>
            </>
        )
    }
});