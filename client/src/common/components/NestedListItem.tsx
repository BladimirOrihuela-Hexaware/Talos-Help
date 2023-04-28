import React from "react";
import { ListItem as MuiListItem, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { Text } from "./Text";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Option, Routes } from "@common/constants";
import NextLink from "next/link";

interface Props {
    option: Option;
    selectedItem: Routes;
    toggle: (text: Routes) => void;
    selectOption: (text: Routes) => void;
    open: boolean;
}

export const NestedListItem = (props: Props) => {
    const { option, open, selectedItem, toggle, selectOption } = props;
    const { text, nested, route } = option;

    return (
        <>
            <MuiListItem disablePadding>
                <ListItemButton
                    selected={selectedItem === route}
                    onClick={() => toggle(route)}
                    href={route}
                    LinkComponent={NextLink}
                >
                    <ListItemText disableTypography>
                        <Text>{text}</Text>
                    </ListItemText>
                    {open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
                </ListItemButton>
            </MuiListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List>
                    {nested!.map(({ name }) => {
                        const _route = `/action/${name}` as Routes;
                        return (
                            <ListItemButton
                                selected={selectedItem === _route}
                                sx={{ pl: 4 }}
                                key={name}
                                href={_route}
                                LinkComponent={NextLink}
                                onClick={() => selectOption(_route)}
                            >
                                <ListItemText disableTypography>
                                    <Text>{name}</Text>
                                </ListItemText>
                            </ListItemButton>
                        );
                    })}
                </List>
            </Collapse>
        </>
    );
};
