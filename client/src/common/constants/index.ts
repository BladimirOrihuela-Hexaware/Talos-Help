export const DrawerWidth = 240;

type Option = {
    text: string;
    route: string;
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
    },
    {
        text: "Renew license",
        route: "/license",
    },
];
