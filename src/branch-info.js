const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { TextControl } = wp.components;

registerBlockType( 's4f-plugin/branch-info', {
    title: 'S4F Branch Info',
    icon: 'universal-access-alt',
    category: 'layout',
    attributes: {
        testControl: {
            type: 'string'
        },
    },
    edit: (props) => {
        const { attributes: { testControl }, setAttributes, className } = props;

        const onChangeTestControl = ( newTestControl ) => {
            setAttributes( { testControl: newTestControl } );
        };

        return (
            <div>
                {
                    <InspectorControls>
                        <TextControl label="Test control" value={testControl} onChange={onChangeTestControl}></TextControl>
                    </InspectorControls>
                }
                <div className="grid-three-col-small grid-with-dividers mt-3 mb-3">
                    <div className="border-grid-child">
                        <div className="font-42 font-bold"><span>424</span></div>
                        <div className="font-mono-uppercase opacity-20"><span>Meals Rescued</span></div>
                    </div>
                    <div className="border-grid-child">
                        <div className="font-42 font-bold"><span>25</span></div>
                        <div className="font-mono-uppercase opacity-20"><span>Partner Bus. and Orgs</span></div>
                    </div>
                    <div className="border-grid-child">
                        <div className="font-42 font-bold"><span>72</span></div>
                        <div className="font-mono-uppercase opacity-20"><span>Student Volunteers</span></div>
                    </div>
                </div>
            </div>
        );
    },
    save: (props) => {
        console.log(props);
        return (
            <div className="grid-three-col-small grid-with-dividers mt-3 mb-3">
                <div className="border-grid-child">
                    <div className="font-42 font-bold"><span>424</span></div>
                    <div className="font-mono-uppercase opacity-20"><span>Meals Rescued</span></div>
                </div>
                <div className="border-grid-child">
                    <div className="font-42 font-bold"><span>25</span></div>
                    <div className="font-mono-uppercase opacity-20"><span>Partner Businesses and Organizations</span></div>
                </div>
                <div className="border-grid-child">
                    <div className="font-42 font-bold"><span>72</span></div>
                    <div className="font-mono-uppercase opacity-20"><span>Student Volunteers</span></div>
                </div>
            </div>
        )
    }
});