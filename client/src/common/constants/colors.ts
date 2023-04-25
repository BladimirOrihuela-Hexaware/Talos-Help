import { createTheme } from "@mui/material/styles";

const colors = {
    talosBlue: "#142073",
    gerkinGreen: "#00A817",
    selectedItem: "#00C6F7",
    red: "#C68290",
    grey: "F0F0F0",
} as const;

export const theme = createTheme({
    palette: {
        primary: { main: colors.talosBlue },
        secondary: { main: colors.gerkinGreen },
    },
});
