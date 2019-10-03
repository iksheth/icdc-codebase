import React from 'react';
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';


const SexPanel = (classes) => {
  const [exapandSexPanel, setExapandSexPanel] = React.useState(false);
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
    setExapandSexPanel(!exapandSexPanel);
  }
  return (
    <>
      {/* Sex */}
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Sex" />
        {exapandSexPanel ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={exapandSexPanel} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          <ListItem button onClick={handleToggle(1)} className={classes.nested}>
            <Checkbox checked={checked.indexOf(1) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="Male" />
          </ListItem>
          <ListItem button onClick={handleToggle(2)} className={classes.nested}>
            <Checkbox checked={checked.indexOf(2) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="Female" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};


export default (SexPanel);
