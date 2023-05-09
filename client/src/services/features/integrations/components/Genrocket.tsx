import { Text, Code, Section } from "@common/components";
import { RootState, AppDispatch } from "@services/store";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getIntegrationByName } from "../selectors";
import type { Integration } from "@atptalos/common";
import { getIntegration } from "../thunks";
import { List, ListItem, Skeleton } from "@mui/material";
import Link from "next/link";

interface Props {
    data?: Integration;
    fetch: () => void;
}
const Genrocket = (props: Props) => {
    const { data, fetch } = props;

    useEffect(() => {
        if (!data || !data.getAtts) {
            fetch();
        }
    }, []);

    if (!data || !data.getAtts) {
        return <Skeleton variant="rectangular" width={210} height={60} />;
    }

    const {
        title,
        description,
        prerequisites,
        connect,
        linkDomain,
        uploadAtts,
        getAtts,
        unlink,
        unlinkProject,
        knownIssues,
    } = data;
    const subtitles = [
        "Prerequisites",
        "Connect TALOS to GenRocket",
        "Link Test Case to GenRocket Domain",
        "Upload attributes from TALOS to GenRocket",
        "Get attributes from GenRocket",
        "Unlink Domain from Test Case",
        "Unlink TALOS Project from GenRocket",
        "Known Issues",
    ];
    return (
        <>
            <Text bold type="h3" paddingBottom={1}>
                {title}
            </Text>
            <Text type="h5" paddingBottom={5} color="black">
                {description}
            </Text>

            <Section
                name="Content"
                custom={
                    <List sx={{ paddingBottom: 5 }}>
                        {subtitles.map((name) => {
                            const id = name.replaceAll(" ", "-").toLocaleLowerCase();
                            return (
                                <ListItem key={name} sx={{ paddingY: 0 }}>
                                    <Link style={{ textDecoration: "none" }} href={`#${id}`}>
                                        <Text type="sub" color="black">
                                            {name}
                                        </Text>
                                    </Link>
                                </ListItem>
                            );
                        })}
                    </List>
                }
            />

            <Section
                name={subtitles[0]}
                desc={prerequisites.desc}
                custom={
                    <List sx={{ listStyleType: "disc", pl: 4, paddingBottom: 5 }}>
                        {prerequisites.list.map((req) => {
                            const firstWord = req.replace(/ .*/, "");
                            req = req.replace(firstWord, "");
                            return (
                                <ListItem sx={{ display: "list-item", paddingY: 0 }} key={req}>
                                    <Text type="sub" color="black">
                                        <Code>
                                            <strong>{firstWord}</strong>
                                        </Code>
                                        {req}
                                    </Text>
                                </ListItem>
                            );
                        })}
                    </List>
                }
            />
            <Section name={subtitles[1]} steps={connect} />
            <Section name={subtitles[2]} desc={linkDomain.desc} steps={linkDomain.steps} />
            <Section name={subtitles[3]} desc={uploadAtts.desc} steps={uploadAtts.steps} />
            <Section name={subtitles[4]} desc={getAtts.desc} steps={getAtts.steps} />
            <Section name={subtitles[5]} steps={unlink.steps} />
            <Section name={subtitles[6]} steps={unlinkProject} />
            <Section name={subtitles[7]} steps={[knownIssues.step]} />
        </>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        data: getIntegrationByName(state, "genrocket"),
    };
};
const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        fetch: () => dispatch(getIntegration("genrocket")),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Genrocket);
