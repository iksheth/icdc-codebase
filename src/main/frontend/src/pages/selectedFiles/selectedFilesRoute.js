import React from 'react';
import { withStyles } from '@material-ui/core';
import MyCases from '../myCases/myCasesView';

const SelectedFilesRoute = () => (
  // Currently this is temporary solution  for route in footer need to replace this
  <MyCases currentTab={0} />
);

const styles = () => ({
});

export default withStyles(styles, { withTheme: true })(SelectedFilesRoute);
