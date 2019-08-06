import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    Grid,
    Paper,
    withStyles,
} from "@material-ui/core";
import { Typography } from "../Wrappers/Wrappers";
import { Query } from 'react-apollo';
import { GET_STATS } from './StatsController';


const Stats = ({ classes, theme, ...props }) => {
    return (
        <Query query={GET_STATS}>
            {({ data, loading, error }) => {
                return (loading ? < CircularProgress /> : (error ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography> :
                    <Grid container spacing={32}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Grid container>
                                    <Grid item xs={1} ></Grid>
                                    <Grid item xs={12} sm={4} lg={2}>
                                        <Typography variant="headline" color="secondary" size="xxl">
                                            {data.numberOfStudies ? data.numberOfStudies : 0}
                                        </Typography>
                                        <Typography variant="headline" color="primary">
                                            Studies
                                </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} lg={2}>
                                        <Typography variant="headline" color="secondary" size="xxl">
                                            {data.numberOfCases ? data.numberOfCases : 0}
                                        </Typography>
                                        <Typography variant="headline" color="primary">
                                            Cases
                                </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} lg={2}>
                                        <Typography variant="headline" color="secondary" size="xxl">
                                            {data.numberOfSamples ? data.numberOfSamples : 0}
                                        </Typography>
                                        <Typography variant="headline" color="primary">
                                            Samples
                                </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} lg={2}>
                                        <Typography variant="headline" color="secondary" size="xxl">
                                            {data.numberOfFiles ? data.numberOfFiles : 0}
                                        </Typography>
                                        <Typography variant="headline" color="primary">
                                            Files
                                </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} lg={2}>
                                        <Typography variant="headline" color="secondary" size="xxl">
                                            {data.numberOfBiospecimenAliquots ? data.numberOfBiospecimenAliquots : 0}
                                        </Typography>
                                        <Typography variant="headline" color="primary">
                                            Biospecimen Aliquots
                                </Typography>
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                )
                );
            }
            }
        </Query>
    );
};

const styles = (theme) => ({
    card: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column"
    },
    paper: {
        textAlign: 'center',
        background: theme.custom.cardBackGround
    },
});

export default withStyles(styles, { withTheme: true })(Stats);
