import React from 'react';
import {
  Grid,
  Paper,
  withStyles,
} from '@material-ui/core';
import { Typography } from '../Wrappers/Wrappers';

const StatsView = ({ classes, data }) => (
  <Grid container spacing={32}>
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={1} />
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
          <Grid item xs={1} />
        </Grid>
      </Paper>
    </Grid>
  </Grid>
);

const styles = (theme) => ({
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    textAlign: 'center',
    background: theme.custom.cardBackGround,
    boxShadow: 'none',
  },
});

export default withStyles(styles, { withTheme: true })(StatsView);
