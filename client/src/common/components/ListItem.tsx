import React from "react";
import { ListItem as MuiListItem, ListItemButton, ListItemText } from "@mui/material";
import { Text } from "./Text";
import NextLink from "next/link";
import { Option } from "@common/constants";

interface Props {
    option: Option;
    selectedItem: string;
    onClick: (text: string) => void;
}

export const ListItem = (props: Props) => {
    const { option, selectedItem, onClick } = props;
    const { text, route } = option;
    return (
        <MuiListItem disablePadding>
            <ListItemButton selected={selectedItem === text} onClick={() => onClick(text)}>
                <ListItemText disableTypography>
                    <NextLink href={route}>
                        <Text>{text}</Text>
                    </NextLink>
                </ListItemText>
            </ListItemButton>
        </MuiListItem>
    );
};
