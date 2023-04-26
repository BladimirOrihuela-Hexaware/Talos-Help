import React from "react";
import { ListItem as MuiListItem, ListItemButton, ListItemText } from "@mui/material";
import { Text } from "./Text";

interface Props {
    text: string;
    selected: boolean;
    onClick: (text: string) => void;
}

export const ListItem = (props: Props) => {
    const { text, selected, onClick } = props;
    return (
        <MuiListItem key={text} disablePadding>
            <ListItemButton selected={selected} onClick={() => onClick(text)}>
                <ListItemText disableTypography>
                    <Text>{text}</Text>
                </ListItemText>
            </ListItemButton>
        </MuiListItem>
    );
};
