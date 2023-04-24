import { GenRocket } from "../models/genrocket.entity";

export const GenRocketData: GenRocket = {
    title: "GenRocket",
    logo: "genrocket logo.png",
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
        { desc: "Go to Projects menu then click on Link Project to GenRocket", image: "linkProj.png" },
        {
            desc: "Fill the Connection form and click Save button. This will trigger a request to authenticate you",
            image: "step 2.png",
        },
        {
            desc: "If the Authentication is successful, a list with your GenRocket Projects will present to you. Select the Project you need and click Connect",
            image: "step 3.png",
        },
        { desc: "Expect a confirmation message after the project is linked to TALOS", image: "confirmation.png" },
        { desc: "You can validate the GenRocket project that is linked with TALOS", image: "validate.png" },
    ],
    linkDomain: {
        desc: "You can generate multiple data types ready to use in your datasheets. \nBut first you need to select a GenRocket domain",
        steps: [
            {
                desc: "Right-Click on the Test Case you want to generate the data from GenRocket. Then click Link to Genrocket Domain",
                image: "link domain.png",
            },
            { desc: "Select the Domain you want to use & click Connect", image: "domains.png" },
            { desc: "Expect a confirmation message", image: "domain connected.png" },
        ],
    },
    uploadAtts: {
        desc: "If you have a datasheet with custom properties. You can Upload those properties to GenRocket for sharing purposes.",
        alert: "The Test Case must be linked to a GenRocket domain. See Link Test Case to GenRocket Domain",
        steps: [
            {
                desc: "Select a Test Case and click on the Datasheet button \nClick on the Upload attributes to GenRocket button",
                image: "upload atts.png",
            },
            { desc: "Expect a confirmation message", image: "uploaded.png" },
        ],
    },
    getAtts: {
        note: "note: By default, each attribute is going to add 25 itereations. You can update the iterations in the Loop count column",
        desc: "Select a Test Case and click on the Datasheet button",
        steps: [
            { desc: "Click on Get attributes from GenRocket button", image: "download.png" },
            {
                desc: "From the displayed attributes, check the boxes of the attributes you want to import into the datasheet",
                image: "select.png",
            },
            {
                desc: "After checking all the required attributes, click on the Map Data button. Expect a confirmation message",
                image: "confirm import.png",
            },
        ],
    },
    unlink: {
        note: "Note: Your attributes previously pulled from GenRocket still are available in the test case datasheet",
        steps: [
            {
                desc: "Right click on the Test Case linked to a GenRocket Domain and Click Unlink from Genrocket Domain",
                image: "unlink domain.png",
            },
            { desc: "Expect a confirmation message", image: "unlink success.png" },
        ],
    },
    unlinkProject: [
        { desc: "Go to Projects menu then click on Un-Link Project from GenRocket", image: "unlink project.png" },
        { desc: "Expect a confirmation message", image: "confirm unlnk.png" },
    ],
    knownIssues: {
        note: "If you face this scenario, click Ok and kindly try again. The Token was renewed and the second time you won't face the Token expiration",
        step: {
            desc: "Sometimes the GenRocket Token used to perform the requests expires, just when you tried to upload attributes or when you were trying to use attributes from GenRocket. If that’s the case, you might see an error like this",
            image: "token expired.png",
        },
    },
};
