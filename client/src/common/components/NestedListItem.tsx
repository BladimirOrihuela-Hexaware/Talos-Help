import React from "react";
import { ListItem as MuiListItem, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { Text } from "./Text";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Option } from "@common/constants";

interface Props {
    option: Option;
    selected: boolean;
    toggle: (text: string) => void;
    open: boolean;
}

export const NestedListItem = (props: Props) => {
    const { option, open, selected, toggle } = props;
    const { text } = option;

    return (
        <>
            <MuiListItem key={text} disablePadding>
                <ListItemButton selected={selected} onClick={() => toggle(text)}>
                    <ListItemText disableTypography>
                        <Text>{text}</Text>
                    </ListItemText>
                    {open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
                </ListItemButton>
            </MuiListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText disableTypography>
                            <Text>{text}</Text>
                        </ListItemText>
                    </ListItemButton>
                </List>
            </Collapse>
        </>
    );
};
