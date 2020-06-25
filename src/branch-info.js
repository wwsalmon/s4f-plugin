const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { TextControl } = wp.components;

registerBlockType( 's4f-plugin/branch-info', {
    title: 'S4F Branch Info',
    icon: 'universal-access-alt',
    category: 'layout',
    attributes: {
        branchName: {
            type: 'string',
            default: "All"
        },
        numDonations: {
            type: "string",
            default: "None yet"
        },
        numPartners: {
            type: "string",
            default: "None yet"
        },
        numVolunteers: {
            type: "string",
            default: "None yet"
        }
    },
    edit: (props) => {
        const { attributes: { branchName, numDonations, numPartners, numVolunteers }, setAttributes, className } = props;

        const onChangeBranchName = (newBranchName) => {setAttributes({branchName: newBranchName});};
        const onChangeNumDonations = (newNumDonations) => {setAttributes({numDonations: newNumDonations});};
        const onChangeNumPartners = (newNumPartners) => {setAttributes({numPartners: newNumPartners});};
        const onChangeNumVolunteers = (newNumVolunteers) => {setAttributes({numVolunteers: newNumVolunteers});};

        fetch("https://spreadsheets.google.com/feeds/cells/1AiJWX3EvgGMYiRtnN_4aiAyNjbEKrM1Y7eq8-p-ASXw/1/public/full?alt=json")
            .then(async res => {
                const spreadsheetData = await res.json();
                const spreadsheetEntries = spreadsheetData.feed.entry.map(el => [el.gs$cell.$t, +el.gs$cell.col, +el.gs$cell.row]);
                const allLabels = spreadsheetEntries.filter(el => el[2] === 1);
                const branchItem = allLabels.find(el => el[0] == branchName);
                const branchNum = spreadsheetEntries.find(el => el[1] === branchItem[1] && el[2] === 2)[0];
                onChangeNumDonations(d3.format(",")(branchNum));
            }).catch(err => onChangeNumDonations("None yet"))

        return (
            <div>
                {
                    <InspectorControls>
                        <TextControl label="Branch name" value={branchName} onChange={onChangeBranchName}></TextControl>
                        <TextControl label="Number of partners" value={numPartners} onChange={onChangeNumPartners}></TextControl>
                        <TextControl label="Number of volunteers" value={numVolunteers} onChange={onChangeNumVolunteers}></TextControl>
                    </InspectorControls>
                }

                <div className="grid-three-col-small grid-with-dividers mt-3 mb-3">
                    <div className="border-grid-child">
                        <div className="font-42 font-bold"><span>{numDonations}</span></div>
                        <div className="font-mono-uppercase opacity-20"><span>Servings Rescued</span></div>
                    </div>
                    <div className="border-grid-child">
                        <div className="font-42 font-bold"><span>{numPartners}</span></div>
                        <div className="font-mono-uppercase opacity-20"><span>Partner Bus. and Orgs</span></div>
                    </div>
                    <div className="border-grid-child">
                        <div className="font-42 font-bold"><span>{numVolunteers}</span></div>
                        <div className="font-mono-uppercase opacity-20"><span>Student Volunteers</span></div>
                    </div>
                </div>
            </div>
        );
    },
    save: (props) => {
        const {numDonations, numPartners, numVolunteers} = props.attributes;
        return (
            <div className="grid-three-col-small grid-with-dividers mt-3 mb-3">
                <div className="border-grid-child">
                    <div className="font-42 font-bold"><span>{numDonations}</span></div>
                    <div className="font-mono-uppercase opacity-20"><span>Servings Rescued</span></div>
                </div>
                <div className="border-grid-child">
                    <div className="font-42 font-bold"><span>{numPartners}</span></div>
                    <div className="font-mono-uppercase opacity-20"><span>Partner Bus. and Orgs</span></div>
                </div>
                <div className="border-grid-child">
                    <div className="font-42 font-bold"><span>{numVolunteers}</span></div>
                    <div className="font-mono-uppercase opacity-20"><span>Student Volunteers</span></div>
                </div>
            </div>
        )
    }
});