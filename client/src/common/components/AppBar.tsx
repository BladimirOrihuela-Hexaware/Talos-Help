import * as React from "react";
import {
    styled,
    alpha,
    AppBar as MuiAppBar,
    Box,
    Toolbar,
    IconButton,
    InputBase,
    Badge,
    MenuItem,
    InputAdornment,
    Menu,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ContactMailRounded from "@mui/icons-material/ContactMailRounded";
import { Text } from "./Text";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.light, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const Shortcut = styled("kbd")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.light, 0.15),
    padding: "0 5px",
    fontSize: "0.9rem",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 1),
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export const AppBar = () => {
    const inputRef = React.useRef<null | HTMLElement>(null);

    React.useEffect(() => {
        const validateInput = (e: KeyboardEvent) => {
            if (e.key.toLocaleLowerCase() === "b" && e.ctrlKey) {
                if (inputRef.current !== null) inputRef.current.focus();
            }
        };

        document.addEventListener("keydown", validateInput);

        return () => {
            document.removeEventListener("keydown", validateInput);
        };
    }, [inputRef]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MuiAppBar position="static" color="transparent">
                <Toolbar>
                    <Text type="h4" noWrap sx={{ display: { xs: "none", sm: "block" } }}>
                        TALOS Docs
                    </Text>
                    <Box sx={{ flexGrow: 1 }} />
                    <Search>
                        <StyledInputBase
                            placeholder="Search documentation..."
                            inputRef={inputRef}
                            tabIndex={0}
                            endAdornment={
                                <InputAdornment position="end" color="primary">
                                    <Shortcut>CTRL B</Shortcut>
                                </InputAdornment>
                            }
                        />
                    </Search>
                    <IconButton
                        size="large"
                        aria-label="Contact us"
                        aria-haspopup="true"
                        onClick={() => console.log("TBD")}
                        color="primary"
                    >
                        <ContactMailRounded />
                    </IconButton>
                </Toolbar>
            </MuiAppBar>
        </Box>
    );
};
