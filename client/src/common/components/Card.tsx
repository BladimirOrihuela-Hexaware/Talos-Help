import React from "react";
import { CardContent, CardMedia, CardActionArea, Card as MuiCard, useTheme } from "@mui/material";
import { Text } from "./Text";

interface Props {
    title: string;
    description: string;
    logo: string;
    onClick: (title: string) => void;
}

export const Card = (props: Props) => {
    const { title, description, logo, onClick } = props;
    return (
        <MuiCard onClick={() => onClick(title)} sx={{ maxWidth: 345, backgroundColor: "#F0F0F0" }}>
            <CardActionArea>
                <CardMedia component="img" height="140" image={logo} alt={title} />
                <CardContent>
                    <Text gutterBottom type="h5">
                        {title}
                    </Text>
                    <Text
                        type="body"
                        sx={{
                            color: "text.primary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {description}
                    </Text>
                </CardContent>
            </CardActionArea>
        </MuiCard>
    );
};
