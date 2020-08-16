const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { TextControl } = wp.components;
const { useState } = wp.element;

registerBlockType( 's4f-plugin/branch-info', {
    title: 'S4F Branch Info',
    icon: 'universal-access-alt',
    category: 'layout',
    attributes: {
        branchName: {
            type: 'string',
            default: "All"
        }
    },
    edit: (props) => {
        const { attributes: { branchName }, setAttributes, className } = props;

        const onChangeBranchName = (newBranchName) => {setAttributes({branchName: newBranchName});};

        const [numDonations, setNumDonations] = useState("Loading...");
        const [numPartners, setNumPartners] = useState('Loading...');
        const [numVolunteers, setNumVolunteers] = useState('Loading...');

        fetch("https://spreadsheets.google.com/feeds/cells/1AiJWX3EvgGMYiRtnN_4aiAyNjbEKrM1Y7eq8-p-ASXw/1/public/full?alt=json")
            .then(async res => {
                const spreadsheetData = await res.json();
                const spreadsheetEntries = spreadsheetData.feed.entry.map(el => [el.gs$cell.$t, +el.gs$cell.col, +el.gs$cell.row]);
                const allLabels = spreadsheetEntries.filter(el => el[2] === 1);
                const branchItem = allLabels.find(el => el[0] == branchName);

                const branchNumDonations = spreadsheetEntries.find(el => el[1] === branchItem[1] && el[2] === 2)[0];
                const branchNumPartners = spreadsheetEntries.find(el => el[1] === branchItem[1] && el[2] === 4)[0];
                const branchNumVolunteers = spreadsheetEntries.find(el => el[1] === branchItem[1] && el[2] === 5)[0];

                setNumDonations(d3.format(",")(branchNumDonations));
                setNumPartners(branchNumPartners);
                setNumVolunteers(branchNumVolunteers);

            }).catch(err => console.log("could not find branch due to error ", err));

        return (
            <div>
                {
                    <InspectorControls>
                        <TextControl label="Branch name" value={branchName} onChange={onChangeBranchName}/>
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

        const {branchName} = props.attributes;
        const script = `
        fetch("https://spreadsheets.google.com/feeds/cells/1AiJWX3EvgGMYiRtnN_4aiAyNjbEKrM1Y7eq8-p-ASXw/1/public/full?alt=json")
                        .then(async res => {
                        const spreadsheetData = await res.json();
                        const spreadsheetEntries = spreadsheetData.feed.entry.map(el => [el.gs$cell.$t, +el.gs$cell.col, +el.gs$cell.row]);
                        const allLabels = spreadsheetEntries.filter(el => el[2] === 1);
                        const branchItem = allLabels.find(el => el[0] == "${branchName}");

                        const branchNumDonations = spreadsheetEntries.find(el => el[1] === branchItem[1] \&\& el[2] === 2)[0];
                        const branchNumPartners = spreadsheetEntries.find(el => el[1] === branchItem[1] \&\& el[2] === 4)[0];
                        const branchNumVolunteers = spreadsheetEntries.find(el => el[1] === branchItem[1] \&\& el[2] === 5)[0];
                        
                        document.getElementById("num-donations").textContent = d3.format(",")(branchNumDonations);
                        document.getElementById("num-partners").textContent = branchNumPartners;
                        document.getElementById("num-volunteers").textContent = branchNumVolunteers;

                    }).catch(err => console.log("could not find branch due to error ", err));
        `;

        return (
            <div className="grid-three-col-small grid-with-dividers mt-3 mb-3">
                <script dangerouslySetInnerHTML={{__html: script}}/>
                <div className="border-grid-child">
                    <div className="font-42 font-bold"><span id="num-donations">Loading...</span></div>
                    <div className="font-mono-uppercase opacity-20"><span>Servings Rescued</span></div>
                </div>
                <div className="border-grid-child">
                    <div className="font-42 font-bold"><span id="num-partners">Loading...</span></div>
                    <div className="font-mono-uppercase opacity-20"><span>Partner Bus. and Orgs</span></div>
                </div>
                <div className="border-grid-child">
                    <div className="font-42 font-bold"><span id="num-volunteers">Loading...</span></div>
                    <div className="font-mono-uppercase opacity-20"><span>Student Volunteers</span></div>
                </div>
            </div>
        )
    }
});