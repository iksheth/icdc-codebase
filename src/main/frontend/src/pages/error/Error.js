import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import caninHelix from '../../assets/error/canine_helix.jpg';

// import logo from './logo.svg';

const Error = ({ classes }) => (
  <Grid container className={classes.container}>
    <Paper classes={{ root: classes.paperRoot }}>
    <Typography variant="h2" color="white" className={classes.errorCodeText}>404 Page Not Found</Typography>
    <hr  className={classes.divider}/>
    <img className={classes.logotypeIcon} src={caninHelix} alt="logo" />
    <div className={classes.errorTextRow}>
    <Typography variant="h6" color="white" className={classes.errorText}>The resource you are looking for is not at this URL.Please navigate to the ICDC Dashboard to access content.</Typography>
    </div>
  </Paper>
  </Grid>
);

const styles = theme => ({
  container: {
    // height: '100vh',
    // width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.palette.primary.main,
    // position: 'absolute',
    top: 0,
    left: 0,
  },
  divider: {
    height: '1px',
    width: '100%'
  },
  paperRoot: {
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 12,
    paddingBottom: theme.spacing.unit * 16,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
    maxWidth: 800,
  },
  errorTextRow:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 600
  }
});

export default withStyles(styles, { withTheme: true })(Error);