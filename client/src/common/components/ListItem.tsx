import React from "react";
import { ListItem as MuiListItem, ListItemButton, ListItemText } from "@mui/material";
import { Text } from "./Text";

interface Props {
    text: string;
    selectedItem: string;
    onClick: (text: string) => void;
}

export const ListItem = (props: Props) => {
    const { text, selectedItem, onClick } = props;
    return (
        <MuiListItem disablePadding>
            <ListItemButton selected={selectedItem === text} onClick={() => onClick(text)}>
                <ListItemText disableTypography>
                    <Text>{text}</Text>
                </ListItemText>
            </ListItemButton>
        </MuiListItem>
    );
};
