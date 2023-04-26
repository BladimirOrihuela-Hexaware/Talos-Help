import React from "react";
import { AppBar, Drawer } from "@common/components";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@common/constants/colors";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

interface Props {
    children: React.ReactNode;
}

export const ScreenWrapper = (props: Props) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar toggleDrawer={handleDrawerToggle} />
            <Drawer mobileOpen={mobileOpen} toggleDrawer={handleDrawerToggle} children={props.children} />
        </ThemeProvider>
    );
};
