import React from "react";
import {
    Grid,
    Paper,
    withStyles,
} from "@material-ui/core";
import { Typography } from "../Wrappers/Wrappers";
import statsData from "./statsMockData";


const Stats = ({ classes, theme, ...props }) => {
    return (
        <Grid container spacing={32}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item xs={1} ></Grid>
                        {statsData.stats.map((stat) => (
                            <Grid item xs={12} sm={4} lg={2}>
                                <Typography variant="headline" color="secondary" size="xxl">
                                    {stat.value}
                                </Typography>
                                <Typography variant="headline" color="primary">
                                    {stat.title}
                                </Typography>
                            </Grid>
                        ))}
                        <Grid item xs={1}></Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

const styles = (theme) => ({
    card: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column"
    },
    paper: {
        textAlign: 'center'
    },
});

export default withStyles(styles, { withTheme: true })(Stats);
