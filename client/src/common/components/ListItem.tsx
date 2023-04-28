import React from "react";
import { ListItem as MuiListItem, ListItemButton, ListItemText } from "@mui/material";
import { Text } from "./Text";
import NextLink from "next/link";
import { Option, Routes } from "@common/constants";

interface Props {
    option: Option;
    selectedItem: string;
    onClick: (route: Routes) => void;
}

export const ListItem = (props: Props) => {
    const { option, selectedItem, onClick } = props;
    const { text, route } = option;
    return (
        <MuiListItem disablePadding>
            <ListItemButton
                LinkComponent={NextLink}
                selected={selectedItem === route}
                onClick={() => onClick(route)}
                href={route}
            >
                <ListItemText disableTypography>
                    <Text>{text}</Text>
                </ListItemText>
            </ListItemButton>
        </MuiListItem>
    );
};
