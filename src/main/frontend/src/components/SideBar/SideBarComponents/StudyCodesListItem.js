import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const StudyCodesPanel = (classes) => {
  const [exapandStudyCodesPanel, setExapandStudyCodesPanel] = React.useState(false);
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function handleClick() {
    setExapandStudyCodesPanel(!exapandStudyCodesPanel);
  }
  return (
    <>
      {/* StudyCodes */}
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Study Codes" />
        {exapandStudyCodesPanel ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={exapandStudyCodesPanel} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.nested} onClick={handleToggle(0)}>
            <Checkbox checked={checked.indexOf(0) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="COTC007B" />
          </ListItem>
          <ListItem className={classes.nested} onClick={handleToggle(1)}>
            <Checkbox checked={checked.indexOf(1) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="COTC010" />
          </ListItem>
          <ListItem className={classes.nested} onClick={handleToggle(2)}>
            <Checkbox checked={checked.indexOf(2) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="COTC018" />
          </ListItem>
          <ListItem button className={classes.nested} onClick={handleToggle(3)}>
            <Checkbox checked={checked.indexOf(3) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="NCATS01" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

const styles = () => ({
  nested: {
  },

});

export default withStyles(styles)(StudyCodesPanel);
