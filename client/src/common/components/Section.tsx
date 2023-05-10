"use client";
import React from "react";
import { Subtitle } from "./Subtitle";
import { Text } from "./Text";
import { Step } from "./Step";
import type { Step as StepType } from "@atptalos/common";

interface Props {
    name: string;
    desc?: string;
    steps?: StepType[];
    custom?: React.ReactNode;
}

/**
 * Renders:
 * Section name,
 * description (optional),
 * a list of steps (optional) or any Custom Component
 *
 * @param Props
 */

export const Section = (props: Props) => {
    const { steps, name, desc, custom } = props;
    return (
        // TODO: Implement Alert
        <>
            <Subtitle text={name} />
            {desc && (
                <Text type="h5" paddingBottom={4} color="black">
                    {desc}
                </Text>
            )}
            {custom !== undefined ? custom : steps && steps.map((step) => <Step key={step.desc} step={step} />)}
        </>
    );
};
