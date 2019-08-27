import React from 'react';
import {
    Checkbox,
    Collapse,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';


const BreedsPanel = (classes) => {
    const [exapandBreedsPanel, setExapandBreedsPanel] = React.useState(false);
    const [checked, setChecked] = React.useState([0]);
    
    const handleToggle = value => () => {
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
        <React.Fragment>
            {/* Breeds */}
            <ListItem button onClick={handleClick}>
                <ListItemText primary="Breeds" />
                {exapandBreedsPanel ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={exapandBreedsPanel} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button onClick={handleToggle(0)} className={classes.nested}>
                        <Checkbox checked={checked.indexOf(0) !== -1} tabIndex={-1} disableRipple color="primary" />
                        <ListItemText primary="American Staffordshire Terrier" />
                    </ListItem>
                    <ListItem button onClick={handleToggle(1)} className={classes.nested}>
                        <Checkbox checked={checked.indexOf(1) !== -1} tabIndex={-1} disableRipple color="primary" />
                        <ListItemText primary="Australian Shepherd" />
                    </ListItem>

                    <ListItem button onClick={handleToggle(2)} className={classes.nested}>
                        <Checkbox checked={checked.indexOf(2) !== -1} tabIndex={-1} disableRipple color="primary" />
                        <ListItemText primary="Basset Hound" />
                    </ListItem>
                    <ListItem button onClick={handleToggle(3)} className={classes.nested}>
                        <Checkbox checked={checked.indexOf(3) !== -1} tabIndex={-1} disableRipple color="primary" />
                        <ListItemText primary="Beagle" />
                    </ListItem>
                    <ListItem button onClick={handleToggle(4)} className={classes.nested}>
                        <Checkbox checked={checked.indexOf(4) !== -1} tabIndex={-1} disableRipple color="primary" />
                        <ListItemText primary="Malinois dog" />
                    </ListItem>
                    <ListItem button onClick={handleToggle(5)} className={classes.nested}>
                        <Checkbox checked={checked.indexOf(5) !== -1} tabIndex={-1} disableRipple color="primary" />
                        <ListItemText primary="Bernese Mountain Dog" />
                    </ListItem>
                    <ListItem button onClick={handleToggle(6)} className={classes.nested}>
                        <Checkbox checked={checked.indexOf(6) !== -1} tabIndex={-1} disableRipple color="primary" />
                        <ListItemText primary="Black and Tan Coonhound" />
                    </ListItem>
                    <ListItem button onClick={handleToggle(7)} className={classes.nested}>
                        <Checkbox checked={checked.indexOf(7) !== -1} tabIndex={-1} disableRipple color="primary" />
                        <ListItemText primary="Border Collie" />
                    </ListItem>
                    <ListItem button onClick={handleToggle(8)} className={classes.nested}>
                        <Checkbox checked={checked.indexOf(8) !== -1} tabIndex={-1} disableRipple color="primary" />
                        <ListItemText primary="Boxer" />
                    </ListItem>
                    <ListItem button onClick={handleToggle(9)} className={classes.nested}>
                        <Checkbox checked={checked.indexOf(9) !== -1} tabIndex={-1} disableRipple color="primary" />
                        <ListItemText primary="Bullmastiff" />
                    </ListItem>
                </List>
            </Collapse>
        </React.Fragment>
    );
}


export default (BreedsPanel);