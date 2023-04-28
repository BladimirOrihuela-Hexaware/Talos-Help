export const DrawerWidth = 240;

export type Routes = "/" | "/info" | "/clouds" | "/integrations" | "/actions" | "/license" | `/action/${string}`;

export type Option = {
    text: string;
    route: Routes;
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
        nested: [{ name: "TypeAction" }, { name: "WaitForCondition" }, { name: "Navigate" }],
    },
    {
        text: "Renew license",
        route: "/license",
    },
];
