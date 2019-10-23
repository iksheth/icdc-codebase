import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { toggleCheckBox } from '../../../pages/dashboard/dashboardState';


const FacetPanel = (classes) => {
  // data from store
  const sideBarContent = useSelector((state) => (
    state.dashboard
    && state.dashboard.checkbox
    && state.dashboard.checkbox.data
      ? state.dashboard.checkbox.data : []));
  // redux use actions
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState([0]);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    let isChecked = false;
    if (currentIndex === -1) {
      newChecked.push(value);
      isChecked = true;
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    // dispatch toggleCheckBox action
    dispatch(toggleCheckBox([{
      groupName: value.split('$$')[1],
      name: value.split('$$')[0],
      datafield: value.split('$$')[2],
      isChecked,
    }]));
  };

  return (
    <>
      {sideBarContent.map((sideBarItem) => (
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
              <ListItem button onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}`)} className={classes.nested}>
                <Checkbox checked={checked.indexOf(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}`) !== -1} tabIndex={-1} disableRipple color="primary" />
                <ListItemText primary={`${checkboxItem.name}(${checkboxItem.cases})`} />
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

export default FacetPanel;
