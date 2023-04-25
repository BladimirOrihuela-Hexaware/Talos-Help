import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@common/constants/colors";
import { Text, AppBar } from "@common/components";

const Index = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar />
            <Text type="h3">Index.tsx</Text>
        </ThemeProvider>
    );
};

export default Index;
