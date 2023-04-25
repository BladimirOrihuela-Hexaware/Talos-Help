import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@common/constants/colors";
import { Prueba } from "@common/components/Prueba";

const Index = () => {
    return (
        <ThemeProvider theme={theme}>
            <Prueba />
        </ThemeProvider>
    );
};

export default Index;
