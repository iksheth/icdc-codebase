import React from 'react';
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const DiagnosisPanel = (classes) => {
  const [exapandDiagnosisPanel, setExapandDiagnosisPanel] = React.useState(false);
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
    setExapandDiagnosisPanel(!exapandDiagnosisPanel);
  }
  return (
    <>
      {/* Diagnosis */}
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Diagnosis" />
        {exapandDiagnosisPanel ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={exapandDiagnosisPanel} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          <ListItem button onClick={handleToggle(7)} className={classes.nested}>
            <Checkbox checked={checked.indexOf(7) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="Bone Sarcomas" />
          </ListItem>
          <ListItem button onClick={handleToggle(1)} className={classes.nested}>
            <Checkbox checked={checked.indexOf(1) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="Lung Adenocarcinoma" />
          </ListItem>
          <ListItem button onClick={handleToggle(2)} className={classes.nested}>
            <Checkbox checked={checked.indexOf(2) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="Lung (Other Carcinoma)" />
          </ListItem>
          <ListItem button onClick={handleToggle(3)} className={classes.nested}>
            <Checkbox checked={checked.indexOf(3) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="Lymphoma" />
          </ListItem>
          <ListItem button onClick={handleToggle(4)} className={classes.nested}>
            <Checkbox checked={checked.indexOf(4) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="Lymphomatoid Granulomatosis" />
          </ListItem>
          <ListItem button onClick={handleToggle(5)} className={classes.nested}>
            <Checkbox checked={checked.indexOf(5) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="Malignant Lymphoma" />
          </ListItem>
          <ListItem button onClick={handleToggle(6)} className={classes.nested}>
            <Checkbox checked={checked.indexOf(6) !== -1} tabIndex={-1} disableRipple color="primary" />
            <ListItemText primary="(metastatic) Melanoma" />
          </ListItem>

        </List>
      </Collapse>
    </>
  );
};


export default (DiagnosisPanel);
