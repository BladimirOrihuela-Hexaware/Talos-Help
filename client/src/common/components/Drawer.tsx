import { useState } from "react";
import { Toolbar, Container, List, Box, Divider, Drawer as MuiDrawer } from "@mui/material";
import { Text } from "./Text";
import { DrawerWidth, Options } from "@common/constants";
import { ListItem } from "./ListItem";

interface Props {
    mobileOpen: boolean;
    toggleDrawer: () => void;
    children: React.ReactNode;
}

export const Drawer = (props: Props) => {
    const { mobileOpen, toggleDrawer } = props;
    const [selected, setSelected] = useState(Options[0].text);

    const selectOption = (text: string) => {
        setSelected(text);
    };

    const drawer = (
        <div>
            <Toolbar>
                <Text type="h4" noWrap sx={{ display: { sm: "block" } }}>
                    TALOS Docs
                </Text>
            </Toolbar>
            <Divider />
            <List>
                {Options.map(({ text }) => (
                    <ListItem text={text} key={text} selected={selected === text} onClick={selectOption} />
                ))}
            </List>
            <Divider />
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <Box
                component="nav"
                sx={{ width: { sm: DrawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <MuiDrawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={toggleDrawer}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: DrawerWidth },
                    }}
                >
                    {drawer}
                </MuiDrawer>
                <MuiDrawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: DrawerWidth },
                    }}
                    open
                >
                    {drawer}
                </MuiDrawer>
            </Box>
            <Box component="main" sx={{ width: { sm: `calc(100% - ${DrawerWidth}px)` } }}>
                {props.children}
            </Box>
        </Box>
    );
};
