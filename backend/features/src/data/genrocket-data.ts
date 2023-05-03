import { IGenrocket } from "@atptalos/common";

export const GenRocketData: IGenrocket = {
    title: "GenRocket",
    logo: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fgenrocket%20logo.webp?alt=media&token=56d4d566-a0e7-470b-9713-a4ffbdb4569c",
    description:
        "GenRocket is an enterprise test data generation, the high-performance alternative to provisioning test data from production data sources with costly and cumbersome Test Data Management (TDM) systems",
    prerequisites: {
        desc: "A GenRocket account, so you can have access to:",
        list: [
            "URL: http://app.genrocket.com/",
            "Username: Your GenRocket username. This is usually an email",
            "Password: Your GenRocket password.",
            "OrganizationId: Find it in your GenRocket account. It's a 36 character string",
        ],
    },
    connect: [
        {
            desc: "Go to Projects menu then click on Link Project to GenRocket",
            image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2FlinkProj.webp?alt=media&token=6b0c2cfc-7699-4218-bd3e-32679cd45b0e",
        },
        {
            desc: "Fill the Connection form and click Save button. This will trigger a request to authenticate you",
            image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fstep%202.webp?alt=media&token=7dc6c867-fdc0-4d73-bdca-94802dd535ef",
        },
        {
            desc: "If the Authentication is successful, a list with your GenRocket Projects will present to you. Select the Project you need and click Connect",
            image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fstep-3.webp?alt=media&token=79a2ed70-8b1a-44a4-aa3b-4c51600d6074",
        },
        {
            desc: "Expect a confirmation message after the project is linked to TALOS",
            image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fconfirmation.webp?alt=media&token=5ea8ae47-bf36-4585-9af3-e960839e301c",
        },
        {
            desc: "You can validate the GenRocket project that is linked with TALOS",
            image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fvalidate.webp?alt=media&token=7f0b2996-767d-4ab3-ae41-0ca8e20a02ad",
        },
    ],
    linkDomain: {
        desc: "You can generate multiple data types ready to use in your datasheets. \nBut first you need to select a GenRocket domain",
        steps: [
            {
                desc: "Right-Click on the Test Case you want to generate the data from GenRocket. Then click Link to Genrocket Domain",
                image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Flink%20domain.webp?alt=media&token=3ce18201-8ebb-41a7-ade4-040612339444",
            },
            {
                desc: "Select the Domain you want to use & click Connect",
                image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fdomains.webp?alt=media&token=76409878-d897-4cd1-8c9e-8c0a7bb9da66",
            },
            {
                desc: "Expect a confirmation message",
                image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fdomain%20connected.webp?alt=media&token=19966403-7b6e-4567-a626-aaac59a5be1d",
            },
        ],
    },
    uploadAtts: {
        desc: "If you have a datasheet with custom properties. You can Upload those properties to GenRocket for sharing purposes.",
        alert: "The Test Case must be linked to a GenRocket domain. See Link Test Case to GenRocket Domain",
        steps: [
            {
                desc: "Select a Test Case and click on the Datasheet button \nClick on the Upload attributes to GenRocket button",
                image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fupload-atts.webp?alt=media&token=a0189d62-7bbe-4868-9093-fc43fa22f7d7",
            },
            {
                desc: "Expect a confirmation message",
                image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fuploaded.webp?alt=media&token=2277768e-5707-4d0d-a11d-ce681ede45aa",
            },
        ],
    },
    getAtts: {
        note: "note: By default, each attribute is going to add 25 itereations. You can update the iterations in the Loop count column",
        desc: "Select a Test Case and click on the Datasheet button",
        steps: [
            {
                desc: "Click on Get attributes from GenRocket button",
                image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fdownload.webp?alt=media&token=7af84a5a-06fb-4410-a696-9f2e8ff5bfe6",
            },
            {
                desc: "From the displayed attributes, check the boxes of the attributes you want to import into the datasheet",
                image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fselect.webp?alt=media&token=39ac0271-9609-450a-a43e-51dd9c7fa6fb",
            },
            {
                desc: "After checking all the required attributes, click on the Map Data button. Expect a confirmation message",
                image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fconfirm-import.webp?alt=media&token=8b11b683-c96a-4ec9-830c-af20dcbba032",
            },
        ],
    },
    unlink: {
        note: "Note: Your attributes previously pulled from GenRocket still are available in the test case datasheet",
        steps: [
            {
                desc: "Right click on the Test Case linked to a GenRocket Domain and Click Unlink from Genrocket Domain",
                image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Funlink-domain.webp?alt=media&token=4efd07e7-85bc-454a-87ac-7c49222627b9",
            },
            {
                desc: "Expect a confirmation message",
                image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Funlink-success.webp?alt=media&token=140f19d4-5f11-4814-aa3d-06b352b762dc",
            },
        ],
    },
    unlinkProject: [
        {
            desc: "Go to Projects menu then click on Un-Link Project from GenRocket",
            image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Funlink-project.webp?alt=media&token=f9519523-1dd8-44a4-a382-ff2742ae5fff",
        },
        {
            desc: "Expect a confirmation message",
            image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Fconfirm%20unlnk.webp?alt=media&token=0f2bf57d-91be-452f-a60a-366e390314cc",
        },
    ],
    knownIssues: {
        note: "If you face this scenario, click Ok and kindly try again. The Token was renewed and the second time you won't face the Token expiration",
        step: {
            desc: "Sometimes the GenRocket Token used to perform the requests expires, just when you tried to upload attributes or when you were trying to use attributes from GenRocket. If that’s the case, you might see an error like this",
            image: "https://firebasestorage.googleapis.com/v0/b/talos-help-dev.appspot.com/o/genrocket%2Ftoken-expired.webp?alt=media&token=914cd87c-4115-43d2-9196-94059abc90d5",
        },
    },
};
