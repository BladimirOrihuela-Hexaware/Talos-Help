export const DrawerWidth = 240;

export type Option = {
    text: string;
    route: string;
    nested?: boolean;
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
        nested: true,
    },
    {
        text: "Renew license",
        route: "/license",
    },
];
