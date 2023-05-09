import { styled, alpha } from "@mui/material";
import React, { PropsWithChildren } from "react";

const KBD = styled("kbd")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.light, 0.15),
    padding: "0 5px",
    fontSize: "0.9rem",
}));

export const Code = (props: PropsWithChildren) => {
    return <KBD>{props.children}</KBD>;
};
