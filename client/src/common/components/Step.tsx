import { Box } from "@mui/material";
import type { Step as StepType } from "@atptalos/common";
import { Text } from "./Text";

interface StepProps {
    step: StepType;
}

const Image = ({ url }: { url: string }) => {
    return (
        <Box
            component="img"
            src={url}
            sx={{
                maxWidth: "100%",
            }}
        />
    );
};

export const Step = (props: StepProps) => {
    const { step } = props;
    return (
        <Box key={step.desc} paddingBottom={5}>
            <Text type="sub" color="black">
                {step.desc}
            </Text>
            <Image url={step.image} />
        </Box>
    );
};
