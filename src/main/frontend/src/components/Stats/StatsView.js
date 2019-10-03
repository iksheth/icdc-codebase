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
          <Grid item xs={12} sm={4} md={2} lg={2}>
            <Typography variant="headline" color="secondary" size="xl">
              {data.numberOfStudies ? data.numberOfStudies : 0}
            </Typography>
            <Typography color="primary" size="md">
                                            Studies
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={2}>
            <Typography variant="headline" color="secondary" size="xl">
              {data.numberOfCases ? data.numberOfCases : 0}
            </Typography>
            <Typography color="primary" size="md">
                                            Cases
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={2}>
            <Typography variant="headline" color="secondary" size="xl">
              {data.numberOfSamples ? data.numberOfSamples : 0}
            </Typography>
            <Typography color="primary" size="md">
                                            Samples
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={2}>
            <Typography variant="headline" color="secondary" size="xl">
              {data.numberOfFiles ? data.numberOfFiles : 0}
            </Typography>
            <Typography color="primary" size="md">
                                            Files
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={2} lg={2}>
            <Typography variant="headline" color="secondary" size="xl">
              {data.numberOfBiospecimenAliquots ? data.numberOfBiospecimenAliquots : 0}
            </Typography>
            <Typography color="primary" size="md">
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
