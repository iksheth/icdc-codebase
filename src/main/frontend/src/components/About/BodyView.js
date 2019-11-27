/* eslint-disable */
import React from 'react';
import { Grid, withStyles } from '@material-ui/core';

const AboutBody = ({ classes, data }) => (
    <Grid container spacing={16} direction="row" className={classes.aboutSection}>
              <Grid item lg={4} md={4} sm={12} xs={12} className={classes.leftSection}>
                <img className={classes.img} src={data.img}/>
              </Grid>
              <Grid item lg={8} md={8} sm={12} xs={12} className={classes.rightSection}>
                <span className={classes.text}>
                {data.body}
                </span>
              </Grid>
         </Grid>
);

const styles = (theme) => ({
 text:{
      height: '476px',
      width: '675px',
      color: '#000000',
      fontFamily: '"Open Sans"',
      fontSize: '14px',
      lineHeight: '22px',
  },
  rightSection:{
    padding:'8px 20px !important',
  },
  leftSection:{

  },
  aboutSection:{
    marginTop:'60px',
  },
  img:{
      width: '100%',
    },
});


export default withStyles(styles)(AboutBody);
