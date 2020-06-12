const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.blockEditor;
const { TextControl } = wp.components;

registerBlockType( 's4f-plugin/branch-person', {
    title: 'S4F Branch Person',
    icon: 'universal-access-alt',
    category: 'layout',
    attributes: {
        branchTitle: {
            type: 'string'
        },
        stateCode: {
            type: "string"
        },
        profileImage: {
            type: "string",
            default: null
        }
    },
    edit: (props) => {
        const { attributes: { profileImage, branchTitle, stateCode }, setAttributes, className } = props;

        const onSelectProfileImage = (imageObject) => {
            const newProfileImage = imageObject.sizes.large ?? imageObject.sizes.full;
            setAttributes({profileImage: newProfileImage.url});
        }

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
                        <MediaUpload onSelect={onSelectProfileImage} type="image" value={profileImage} render={({open}) => (
                            <button onClick={open}>Upload profile picture</button>
                        )}></MediaUpload>
                        <TextControl label="Branch Name" value={branchTitle} onChange={onChangeBranchTitle}></TextControl>
                        <TextControl label="State Code" value={stateCode} onChange={onChangeStateCode}></TextControl>
                    </InspectorControls>
                }
                <div className="p-3 bg-gray-1 flex">
                    <div className="width-120">
                        <img src={profileImage}/>
                    </div>
                    <div className="ml-3 flex-1">
                        <div className="font-mono-uppercase font-12-lt-600 opacity-20 mb-1"><span>Branch Director</span></div>
                        <div className="font-l-responsive font-bold"><span>Samson Zhang</span></div>
                        <hr className="mt-1 mb-1 opacity-20"></hr>
                        <div className="font-mono font-normal font-12-lt-600"><span>samsonzhangthesalmon</span></div>
                        <div className="font-mono font-normal font-12-lt-600"><span>samsonzhang@stem4free.org</span></div>
                    </div>
                </div>
            </div>
        );
    },
    save: (props) => {
        console.log(props);
        return (
            <div className="p-3 bg-gray-1 flex">
                <div className="width-120">
                    <img src={props.attributes.profileImage}/></div>
                <div className="ml-3 flex-1">
                    <div className="font-mono-uppercase font-12-lt-600 opacity-20 mb-1"><span>Branch Director</span></div>
                    <div className="font-l-responsive font-bold"><span>Samson Zhang</span></div>
                    <hr className="mt-1 mb-1 opacity-20"></hr>
                    <div className="font-mono font-normal font-12-lt-600"><span>samsonzhangthesalmon</span></div>
                    <div className="font-mono font-normal font-12-lt-600"><span>samsonzhang@stem4free.org</span></div>
                </div>
            </div>
        )
    }
});