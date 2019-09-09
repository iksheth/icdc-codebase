import React from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { AccountCircle as AccountIcon, Person  as PersonIcon} from '@material-ui/icons';
import { Typography } from "../Wrappers/Wrappers";


export default function ProfileMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const username = localStorage.getItem("username");

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div>
            <IconButton
                color="inherit"
                aria-haspopup="true"
                aria-controls="mail-menu"
                onClick={handleClick}

            >
             <Tooltip title="Profile" placement="bottom-end">
                <AccountIcon />
            </Tooltip>
            </IconButton>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                <MenuItem onClick={handleClose}>
                    <PersonIcon /><Typography variant="h4" weight="medium">
                        {username}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
               <Typography fontSize="medium" weight="light">
                        Profile
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                <Typography fontSize="medium" weight="light">
                        My Account
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Typography fontSize="medium" weight="light">
                        signout
                    </Typography>
                </MenuItem>
            </Menu>
        </div>
    );
}