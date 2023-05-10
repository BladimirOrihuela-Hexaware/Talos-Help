import { Text } from "./Text";
import Link from "next/link";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";
import { Container } from "@mui/material";

interface Props {
    text: string;
    paddingBottom?: number;
}

export const Subtitle = (props: Props) => {
    const { text, paddingBottom } = props;
    const [showIcon, setShowIcon] = useState(false);
    const id = text.replaceAll(" ", "-").toLocaleLowerCase();

    return (
        <Text
            type="h4"
            paddingBottom={paddingBottom ?? 1}
            bold
            id={id}
            onMouseOver={() => setShowIcon(true)}
            onMouseOut={() => setShowIcon(false)}
        >
            <Link
                style={{ textDecoration: "none", display: "flex", alignItems: "center", color: "inherit" }}
                href={`#${id}`}
            >
                <>
                    {text}
                    <div style={{ marginLeft: "8px" }}>{showIcon && <LinkIcon />}</div>
                </>
            </Link>
        </Text>
    );
};
