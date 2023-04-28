"use client";
import React from "react";
import { AppBar } from "@common/components";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@common/constants/colors";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StoreProvider } from "@services/store/provider";
import { PropsWithChildren } from "react";
import Drawer from "./Drawer";

const ScreenWrapper = (props: PropsWithChildren) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <StoreProvider>
                <AppBar toggleDrawer={handleDrawerToggle} />
                <Drawer mobileOpen={mobileOpen} toggleDrawer={handleDrawerToggle} children={props.children} />
            </StoreProvider>
        </ThemeProvider>
    );
};

export default ScreenWrapper;
