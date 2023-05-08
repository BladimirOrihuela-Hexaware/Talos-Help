import { useEffect } from "react";
import { Card } from "@common/components";
import { AppDispatch, RootState } from "@services/store";
import { connect } from "react-redux";
import { getAllIntegrations } from "../thunks";
import { getIntegrationList } from "../selectors";
import type { BasicIntegration } from "@atptalos/common";
import { Grid } from "@mui/material";

interface Props {
    getIntegrations: () => void;
    list: BasicIntegration[];
}

const IntegrationsList = (props: Props) => {
    const navigate = (title: string) => {
        // Nav to ${title};
    };

    useEffect(() => {
        //Fetch all integrations
        props.getIntegrations();
    }, []);

    return (
        <Grid container spacing={3} justifyContent="space-evenly" columns={3} sx={{ padding: 3 }}>
            {props.list.map((i, index) => (
                <Grid item xs={1}>
                    <Card
                        key={`${i.title}.${index}`}
                        title={i.title}
                        logo={i.logo}
                        description={i.description}
                        onClick={navigate}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        list: getIntegrationList(state),
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        getIntegrations: () => dispatch(getAllIntegrations()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationsList);
