import { Button as MuiButton, ButtonTypeMap } from "@mui/material";
import React from "react";

const variants = {
    primary: "contained",
    secondary: "outlined",
    borderless: "text",
} as const;

type ButtonType = keyof typeof variants;
type Variants = typeof variants[ButtonType];

const getButtonVariant = (type?: ButtonType): Variants => {
    if (!type) return variants.primary;
    return variants[type];
};

export type ButtonProps = {
    text: string;
    btntype?: ButtonType;
    onClick: () => void;
} & ButtonTypeMap["props"];

const Button = (props: ButtonProps) => {
    const { text, btntype, onClick } = props;
    return (
        <MuiButton {...props} onClick={onClick} variant={getButtonVariant(btntype)}>
            {text}
        </MuiButton>
    );
};

export default Button;
