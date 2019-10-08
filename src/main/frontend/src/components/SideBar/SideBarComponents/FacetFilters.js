import React from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import sideBarContent from '../content';

const FacetPanel = (classes) => {
  const [checked, setChecked] = React.useState([0]);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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


  return (
    <>
      {sideBarContent.sideBarData.map((sideBarItem) => (
        <>
          <ExpansionPanel
            expanded={expanded === sideBarItem.groupName}
            onChange={handleChange(sideBarItem.groupName)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <ListItemText primary={sideBarItem.groupName} />
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
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
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </>
      ))}
    </>
  );
};


export default (FacetPanel);
