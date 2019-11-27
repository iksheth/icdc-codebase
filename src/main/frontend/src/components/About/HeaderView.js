/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const AboutHeader = ({ classes, title }) => (
    <div className={classes.header}>
      <div className={classes.slope}></div>
      <div className={classes.slope2}><span className={classes.slope2Text}>{title}</span></div>
      </div>
);

const styles = (theme) => ({
  header:{
    position: 'relative',
    marginTop:'20px',
  },
  slope2Text:{
      height: '65px',
      width: '252px',
      color: '#087CA5',
      fontFamily: 'Raleway',
      fontSize: '25px',
      fontWeight: 'bold',
      letterSpacing: '0.025em',
      lineHeight: '65px',
  },
  slope:{
   background: '#087CA5',
    width: '20%',
    height: '65px',
    '&:after':{
          content: '""',
          position: 'absolute',
          left: '20%',
          borderTop: '65px solid #087CA5',
          borderRight: '65px solid transparent',
    }
  },
  slope2:{
    background: '#E5E7E8',
    width: 'calc(80% - 54px)',
    height: '65px',
    float: 'right',
    position: 'absolute',
    right: '0',
    top: '20px',
    '&:after':{
          content: '""',
          position: 'absolute',
          right: '100%',
          borderBottom: '65px solid #E5E7E8',
          borderLeft: '65px solid transparent',
    }
  },
});


export default withStyles(styles)(AboutHeader);
