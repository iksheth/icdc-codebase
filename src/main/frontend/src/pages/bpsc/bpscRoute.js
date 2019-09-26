import React from 'react';
import { withStyles } from '@material-ui/core';
import About from '../about/aboutView';

const bpscRoute = () => (
  // Currently this is temporary solution  for route in footer need to replace this
  <About currentTab={2} />
);

const styles = () => ({
});

export default withStyles(styles, { withTheme: true })(bpscRoute);
