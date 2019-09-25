import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Typography } from '../../components/Wrappers/Wrappers';
import mockData from './content';

import Stats from '../../components/Stats/StatsController';
import ProgramCard from './components/programcard';

const Programs = ({ classes }) => (
  <>
    <Stats />
    <div className={classes.cardContainer}>
      <Grid container spacing={32}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography weight="bold" size="xxl" color="warning">ALL PROGRAMS</Typography>
        </Grid>
        {mockData.programs.map((data) => (
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ProgramCard data={data} />
          </Grid>
        ))}
      </Grid>
    </div>
  </>
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
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  cardContainer: {
    margin: '16px auto',
    maxWidth: '1100px',
  },
});

export default withStyles(styles, { withTheme: true })(Programs);
