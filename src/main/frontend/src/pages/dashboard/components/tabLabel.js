import React from 'react';
import { withStyles } from '@material-ui/core';

const tabLabel = ({
  classes, title, count, primaryColor, secondaryColor,
}) => (
  <div>
    <span style={{ color: primaryColor }}>
      {title}
    </span>
    <span
      style={{ backgroundColor: secondaryColor }}
      className={classes.countBox}
    >
      {count}
    </span>
  </div>
);

const styles = () => ({
  countBox: {
    height: '19px',
    width: '28px',
    padding: '4px',
    marginLeft: '10px',
    fontFamily: 'Open Sans',
    fontSize: '13px',
    lineHeight: '25px',
    backgroundColor: '#D1CFCF',
  },

});

export default withStyles(styles, { withTheme: true })(tabLabel);
