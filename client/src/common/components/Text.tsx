import * as React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";

const variants = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    sub: "subtitle1",
    body: "body2",
} as const;

type TextType = keyof typeof variants;
type Variant = typeof variants[TextType];

const getTextVariant = (type?: TextType): Variant => {
    if (!type) return variants.body;
    return variants[type];
};

type TextProps = {
    type?: TextType;
} & TypographyProps;

export const Text = (props: TextProps) => {
    return (
        <Typography {...props} variant={getTextVariant(props.type)}>
            {props.children}
        </Typography>
    );
};
