import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import classnames from 'classnames';

import {
  AppBar,
  Toolbar,
  IconButton,
  withStyles,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ColorLens as ColorLensIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";
import ProfileMenu from '../ProfileMenu/ProfileMenuView';
import { Typography } from "../Wrappers/Wrappers";

const drawerWidth = 240;


const NavBar = ({ classes, isSidebarOpened, toggleSidebar, ...props }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return(
  <React.Fragment>

<AppBar position="relative" className={classnames(classes.appBar, { [classes.appBarShift]: open })} color="primary">

  <Toolbar>
{open?
  <IconButton
      color="inherit"
      aria-label="Open drawer"
      onClick={handleDrawerClose}
      edge="start"
      className={classes.menuButton}
    >
              <ArrowBackIcon />
    </IconButton>
    :
    <IconButton
      color="inherit"
      aria-label="Open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      className={classes.menuButton}
    >
              <MenuIcon />
    </IconButton>
}
      {/* Reminder: Ajay will to replace the ICDC with env variable and change build npm to read env variable*/}
      <Link className={classes.link} to="/dashboard"><Typography variant="h6" weight="medium" className={classes.logotype}>Dashboard</Typography></Link>
      <Link className={classes.link} to="/programs"><Typography variant="h6" weight="medium" className={classes.logotype}>All Programs</Typography></Link>
      <Link className={classes.link} to="/studies"><Typography variant="h6" weight="medium" className={classes.logotype}>All Studies</Typography></Link>
      <Link className={classes.link} to="/cases"><Typography variant="h6" weight="medium" className={classes.logotype}>All Cases</Typography></Link>
      <Link className={classes.link} to="/cases"><Typography variant="h6" weight="medium" className={classes.logotype}>About</Typography></Link>

      <div className={classes.grow} />
      <IconButton
        color="inherit"
        aria-haspopup="true"
        aria-controls="mail-menu"
        onClick={()=> { theme.toggleTheme(); }}
        className={classes.headerMenuButton}
      >
        <Tooltip title="Light/Dark Theme" placement="bottom-end">
          <ColorLensIcon classes={{ root: classes.headerIcon }} />
          </Tooltip>
      </IconButton>
      <ProfileMenu />
  </Toolbar>
</AppBar>
<Drawer
  className={classes.drawer}
  variant="persistent"
  anchor="left"
  open={open}
  classes={{
    paper: classes.drawerPaper,
  }}
>
  <List>
    {['Studies', 'Breed', 'Sex', 'Disease'].map((text, index) => (
      <ListItem button key={text}>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>
</Drawer>
</ React.Fragment>

  )}
;

const styles = (theme) => ({
  logotype: {
    color: "white",
    marginLeft: theme.spacing.unit * 2.5,
    marginRight: theme.spacing.unit * 2.5,
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  appBar: {
    width: "100vw",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  hide: {
    display: "none"
  },
  grow: {
    flexGrow: 1
  },
  messageContent: {
    display: "flex",
    flexDirection: "column"
  },
  headerMenu: {
    marginTop: theme.spacing.unit * 7
  },
  headerMenuList: {
    display: "flex",
    flexDirection: "column"
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
      color: "white"
    }
  },
  headerMenuButton: {
    marginLeft: theme.spacing.unit * 2,
    padding: theme.spacing.unit / 2
  },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing.unit * 2
  },
  headerIcon: {
    fontSize: 28
  },
  headerIconCollapse: {
    color: "white"
  },
  profileMenu: {
    minWidth: 265
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit * 2
  },
  profileMenuItem: {
    color: theme.palette.text.hint
  },
  profileMenuIcon: {
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.text.hint
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  messageNotification: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light
    }
  },
  messageNotificationSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing.unit * 2
  },
  messageNotificationBodySide: {
    alignItems: "flex-start",
    marginRight: 0
  },
  sendMessageButton: {
    margin: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    textTransform: "none"
  },
  sendButtonIcon: {
    marginLeft: theme.spacing.unit * 2
  },
  link:{
    textDecoration: 'none'
  },
  menuButton: {
    marginRight: theme.spacing.unit * 2,
  },
  hide: {
    display: 'none',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '80px'
  },
});

export default withStyles(styles)(NavBar);
