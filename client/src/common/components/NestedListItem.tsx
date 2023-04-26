import React from "react";
import { ListItem as MuiListItem, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { Text } from "./Text";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Option } from "@common/constants";
import NextLink from "next/link";

interface Props {
    option: Option;
    selectedItem: string;
    toggle: (text: string) => void;
    selectOption: (text: string) => void;
    open: boolean;
}

export const NestedListItem = (props: Props) => {
    const { option, open, selectedItem, toggle, selectOption } = props;
    const { text, nested, route } = option;

    return (
        <>
            <MuiListItem disablePadding>
                <ListItemButton selected={selectedItem === text} onClick={() => toggle(text)}>
                    <ListItemText disableTypography>
                        <NextLink href={route}>
                            <Text>{text}</Text>
                        </NextLink>
                    </ListItemText>
                    {open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
                </ListItemButton>
            </MuiListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List>
                    {nested!.map(({ name }) => {
                        return (
                            <ListItemButton
                                selected={selectedItem === name}
                                sx={{ pl: 4 }}
                                key={name}
                                onClick={() => selectOption(name)}
                            >
                                <ListItemText disableTypography>
                                    <NextLink href={`${route}/${name}`}>
                                        <Text>{name}</Text>
                                    </NextLink>
                                </ListItemText>
                            </ListItemButton>
                        );
                    })}
                </List>
            </Collapse>
        </>
    );
};
