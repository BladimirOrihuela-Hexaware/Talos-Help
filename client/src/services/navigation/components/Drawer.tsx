import { useState } from "react";
import { Toolbar, List, Box, Divider, Drawer as MuiDrawer } from "@mui/material";
import { Text, NestedListItem, ListItem } from "@common/components";
import { DrawerWidth, Option, Options, Routes } from "@common/constants";
import { RootState, AppDispatch } from "@services/store";
import { connect } from "react-redux";
import { getSelectedRoute, isToggleOpen } from "@services/navigation/selector";
import { actions } from "@services/navigation/slicer";

interface Props {
    mobileOpen: boolean;
    toggleDrawer: () => void;
    children: React.ReactNode;
    selectedRoute: Routes;
    updateRoute: (r: Routes) => void;
    toggleNested: () => void;
    isOpen: boolean;
}

const Drawer = (props: Props) => {
    const { mobileOpen, toggleDrawer, selectedRoute, updateRoute, toggleNested, isOpen } = props;
    const [selected, setSelected] = useState(selectedRoute);

    const selectOption = (route: Routes) => {
        if (route !== selected) {
            updateRoute(route);
            setSelected(route);
        }
    };

    const toggleActions = (route: Routes) => {
        selectOption(route);
        toggleNested();
    };

    const drawer = (
        <>
            <Toolbar>
                <Text type="h4" noWrap sx={{ display: { sm: "block" } }}>
                    TALOS Docs
                </Text>
            </Toolbar>
            <Divider />
            <List>
                {Options.map((option: Option) => {
                    const { text, nested } = option;
                    if (nested !== undefined)
                        return (
                            <NestedListItem
                                open={isOpen}
                                option={option}
                                key={text}
                                selectedItem={selected}
                                toggle={toggleActions}
                                selectOption={selectOption}
                            />
                        );
                    return <ListItem option={option} key={text} selectedItem={selected} onClick={selectOption} />;
                })}
            </List>
            <Divider />
        </>
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

const mapStateToProps = (state: RootState) => {
    return {
        selectedRoute: getSelectedRoute(state),
        isOpen: isToggleOpen(state),
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        updateRoute: (route: Routes) => dispatch(actions.navigateTo(route)),
        toggleNested: () => dispatch(actions.toggleActions()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
