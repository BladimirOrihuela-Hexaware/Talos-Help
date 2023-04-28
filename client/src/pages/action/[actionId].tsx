import React from "react";
import { Text } from "@common/components";
import ScreenWrapper from "@services/navigation/components/ScreenWrapper";
import { useRouter } from "next/router";

const ActionTemplate = () => {
    const router = useRouter();
    const { actionId } = router.query;
    return (
        <ScreenWrapper>
            <Text>Render action {actionId}</Text>
        </ScreenWrapper>
    );
};

export default ActionTemplate;
