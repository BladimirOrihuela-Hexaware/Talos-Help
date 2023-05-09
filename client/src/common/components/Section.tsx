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
    custom?: React.ReactNode; // If Custom Component is provided, pass [] as steps
}

/**
 * Renders:
 * Section name,
 * description (optional),
 * a list of steps (optional) or any Custom Component
 *
 * If you want to render a custom component insted of Step,
 * pass [] in the steps property to avoid lint complains.
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
            {custom !== undefined ? custom : steps && steps.map((step) => <Step step={step} />)}
        </>
    );
};
