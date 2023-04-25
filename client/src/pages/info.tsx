import React from "react";
import { AppBar, Drawer } from "@common/components";

interface Props {
    children: React.ReactNode;
}

export const MainScreen = (props: Props) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <AppBar toggleDrawer={handleDrawerToggle} />
            <Drawer mobileOpen={mobileOpen} toggleDrawer={handleDrawerToggle} children={props.children} />
        </>
    );
};
