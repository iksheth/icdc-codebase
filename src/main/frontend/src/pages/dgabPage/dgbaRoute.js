import React from 'react';
import { withStyles } from '@material-ui/core';
import About from '../about/aboutView';

const dgab = () => (
  // Currently this is temporary solution  for DGAB route in footer need to replace this
  <About currentTab={1} />
);

const styles = () => ({
});

export default withStyles(styles, { withTheme: true })(dgab);
