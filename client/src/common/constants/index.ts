export const DrawerWidth = 240;

export type Option = {
    text: string;
    route: string;
    nested?: {
        name: string;
    }[];
};

export const Options: Option[] = [
    {
        text: "Info",
        route: "/info",
    },
    {
        text: "Clouds",
        route: "/clouds",
    },
    {
        text: "Integrations",
        route: "/integrations",
    },
    {
        text: "Actions",
        route: "/actions",
        nested: [
            { name: "Action 1" },
            { name: "Action 2" },
            { name: "Action 33" },
            { name: "Action 4" },
            { name: "Action 5" },
            { name: "Action 6" },
        ],
    },
    {
        text: "Renew license",
        route: "/license",
    },
];
