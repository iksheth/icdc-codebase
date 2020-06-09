import React from 'react';
import { Grid, withStyles } from '@material-ui/core';

const warning = ({ classes, ids = [] }) => (
  <div className={classes.warnWrapper} id="warning_cart">
    <Grid item xs={12} className={classes.text}>
      The following Cases have been updated and removed from the My Cases cart workflow:
    </Grid>
    <Grid item xs={12} className={classes.text}>
      <span>[</span>
      <span>{ids.join(',').slice(0, -1)}</span>
      <span>]</span>
    </Grid>
    <Grid item xs={12} className={classes.text}>
      The updated records can be found via search and added back into your cart as necessary
    </Grid>
  </div>
);

const styles = (theme) => ({
  warnWrapper: {
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    margin: '30px auto 30px auto',
    maxWidth: '1440px',
    background: 'rgb(240, 173, 78,0.5)',
    padding: '15px 35px',
  },
  text: {
    color: '#000000',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '15px',
    lineHeight: '22px',
  },
});


export default withStyles(styles, { withTheme: true })(warning);
