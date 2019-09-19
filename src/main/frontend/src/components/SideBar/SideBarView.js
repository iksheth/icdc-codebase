import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SexPanel from './SideBarComponents/SexListItem';
import DiagnosisPanel from './SideBarComponents/DiagnosisListItem';
import StudyCodesPanel from './SideBarComponents/StudyCodesListItem';
import BreedsPanel from './SideBarComponents/BreedsListItem';

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const SideBarContent = () => (
  <List component="nav" aria-label="main mailbox folders">
    <StudyCodesPanel />
    <BreedsPanel />
    <DiagnosisPanel />
    <SexPanel />
  </List>
);

export default withStyles(styles)(SideBarContent);
