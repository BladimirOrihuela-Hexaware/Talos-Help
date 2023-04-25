import * as React from "react";
import { styled, alpha, AppBar as MuiAppBar, Box, Toolbar, IconButton, InputBase, InputAdornment } from "@mui/material";
import ContactMailRounded from "@mui/icons-material/ContactMailRounded";
import MenuIcon from "@mui/icons-material/Menu";

const Search = styled("div")(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.light, 0.15),
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
    padding: theme.spacing(0.5, 1, 0.5, 1),
    "& .MuiInputBase-input": {
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

interface Props {
    toggleDrawer: () => void;
}

export const AppBar = (props: Props) => {
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
        <MuiAppBar position="sticky" color="inherit">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.toggleDrawer}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
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
    );
};
