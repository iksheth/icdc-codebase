import React from 'react';
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import sideBarContent from '../content';

const BreedsPanel = (classes) => {
  const [exapandBreedsPanel, setExapandBreedsPanel] = React.useState(false);
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
    setExapandBreedsPanel(!exapandBreedsPanel);
  }
  return (
    <>
      {sideBarContent.sideBarData.map((sideBarItem) => (
        <>
          <ListItem button onClick={handleClick}>
            <ListItemText primary={sideBarItem.groupName} />
            {exapandBreedsPanel ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={exapandBreedsPanel} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense>
              {
            sideBarItem.checkboxItems.map((checkboxItem) => (
              <ListItem button onClick={handleToggle(`${checkboxItem.name}-state`)} className={classes.nested}>
                <Checkbox checked={checked.indexOf(`${checkboxItem.name}-state`) !== -1} tabIndex={-1} disableRipple color="primary" />
                <ListItemText primary={checkboxItem.name} />
              </ListItem>
            ))
          }
            </List>
          </Collapse>
        </>
      ))}
    </>
  );
};


export default (BreedsPanel);
