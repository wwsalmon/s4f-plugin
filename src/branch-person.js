const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload } = wp.blockEditor;
const { TextControl } = wp.components;

registerBlockType( 's4f-plugin/branch-person', {
    title: 'S4F Branch Person',
    icon: 'universal-access-alt',
    category: 'layout',
    attributes: {
        role: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        ig: {
            type: 'string'
        },
        profileImage: {
            type: "string",
            default: null
        }
    },
    edit: (props) => {
        const { attributes: { profileImage, role, name, email, ig }, setAttributes, className } = props;

        const onSelectProfileImage = (imageObject) => {
            const newProfileImage = imageObject.sizes.large ?? imageObject.sizes.full;
            setAttributes({profileImage: newProfileImage.url});
        };

        const onChangeRole = (newRole) => {setAttributes({role: newRole});};
        const onChangeName = (newName) => {setAttributes({name: newName});};
        const onChangeEmail = (newEmail) => {setAttributes({email: newEmail});};
        const onChangeIg = (newIg) => {setAttributes({ig: newIg});};

        return (
            <div>
                {
                    <InspectorControls>
                        <MediaUpload onSelect={onSelectProfileImage} type="image" value={profileImage} render={({open}) => (
                            <button onClick={open}>Upload profile picture</button>
                        )}></MediaUpload>
                        <TextControl label="Name" value={name} onChange={onChangeName}></TextControl>
                        <TextControl label="Title" value={role} onChange={onChangeRole}></TextControl>
                        <TextControl label="Email" value={email} onChange={onChangeEmail}></TextControl>
                        <TextControl label="Instagram username" value={ig} onChange={onChangeIg}></TextControl>
                    </InspectorControls>
                }
                <div className="p-3 bg-gray-1 flex">
                    <div className="width-120">
                        <img src={profileImage}/>
                    </div>
                    <div className="ml-3 flex-1">
                        <div className="font-mono-uppercase font-12-lt-600 opacity-20 mb-1"><span>{role}</span></div>
                        <div className="font-l-responsive font-bold"><span>{name}</span></div>
                        <hr className="mt-1 mb-1 opacity-20"></hr>
                        <div className="font-mono font-normal font-12-lt-600"><span><a href={`mailto:${email}`}>{email}</a></span></div>
                        <div className="font-mono font-normal font-12-lt-600"><span><a href={`https://www.instagram.com/${ig}/`}><i className="fab fa-instagram"></i> @{ig}</a></span></div>
                    </div>
                </div>
            </div>
        );
    },
    save: (props) => {
        const { attributes: { profileImage, role, name, email, ig }} = props;
        return (
            <div className="p-3 bg-gray-1 flex">
                <div className="width-120">
                    <img src={profileImage}/></div>
                <div className="ml-3 flex-1">
                    <div className="font-mono-uppercase font-12-lt-600 opacity-20 mb-1"><span>{role}</span></div>
                    <div className="font-l-responsive font-bold"><span>{name}</span></div>
                    <hr className="mt-1 mb-1 opacity-20"></hr>
                    <div className="font-mono font-normal font-12-lt-600"><span><a href={`mailto:${email}`}>{email}</a></span></div>
                    <div className="font-mono font-normal font-12-lt-600"><span><a href={`https://www.instagram.com/${ig}/`}><i className="fab fa-instagram"></i> @{ig}</a></span></div>
                </div>
            </div>
        )
    }
});