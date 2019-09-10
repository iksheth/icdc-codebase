import React from "react";
import queryString from "query-string";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Tooltip,
  withStyles
} from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  ColorLens as ColorLensIcon,
  Menu as MenuIcon
} from "@material-ui/icons";
import classnames from "classnames";
import { Link } from "react-router-dom";
import ProfileMenu from "../ProfileMenu/ProfileMenuView";
import SideBarContent from "../SideBar/SideBarView";
import { useTheme } from "../ThemeContext";
import { Typography } from "../Wrappers/Wrappers";

const drawerWidth = 240;
// const FENCE_LOGIN_URL = process.env.FENCE_LOGIN_URL;
const FENCE_LOGIN_URL = process.env.REACT_APP_LOGIN_URL;
const BACKEND_GETUSERINFO_API = process.env.REACT_APP_BACKEND_GETUSERINFO_API;

const NavBar = ({ classes, isSidebarOpen, setIsSidebarOpen, ...props }) => {
  const theme = useTheme();
  const [authState, setAuthState] = React.useState({
    isAuthorized: localStorage.getItem("isAuthorized") === "true"
  });
  // Similar to componentDidMount and componentDidUpdate:
  // Empty second argument of react useEffect will avoid the infinte loop that caused due to component update
  React.useEffect(() => {
    const values = queryString.parse(window.location.search);

    if (values.code) {
      fetch(BACKEND_GETUSERINFO_API + values.code)
        .then(function(response) {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(function(result) {
          setAuthState({
            ...authState,
            isAuthorized: true
          });
          localStorage.setItem("username", JSON.stringify(result.user));
          localStorage.setItem("isAuthorized", "true");          
        })
        .catch(function(error) {
          // Need to update this
          // setAuthState({ ...authState, username: "", isAuthorized: false });
          // localStorage.setItem("isAuthorized", "false");
        });
    }
  }, []);

  function toggleSideBar() {
    isSidebarOpen ? setIsSidebarOpen(true) : setIsSidebarOpen(false);
    setIsSidebarOpen(isSidebarOpen === true ? false : true);
  }
console.log('hey'+BACKEND_GETUSERINFO_API);

  return (
    <React.Fragment>
      <AppBar
        position='relative'
        className={classnames(classes.appBar, {
          [classes.appBarShift]: isSidebarOpen
        })}
        color='primary'
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={toggleSideBar}
            edge='start'
            className={classnames(classes.menuButton, {
              [classes.hide]: isSidebarOpen
            })}
          >
            <MenuIcon />
          </IconButton>
          {/* Reminder: Ajay will to replace the ICDC with env variable and change build npm to read env variable*/}
          <Link className={classes.link} to='/dashboard'>
            <Typography
              variant='h6'
              weight='medium'
              className={classes.logotype}
            >
              Dashboard
            </Typography>
          </Link>
          <Link className={classes.link} to='/programs'>
            <Typography
              variant='h6'
              weight='medium'
              className={classes.logotype}
            >
              All Programs
            </Typography>
          </Link>
          <Link className={classes.link} to='/studies'>
            <Typography
              variant='h6'
              weight='medium'
              className={classes.logotype}
            >
              All Studies
            </Typography>
          </Link>
          <Link className={classes.link} to='/cases'>
            <Typography
              variant='h6'
              weight='medium'
              className={classes.logotype}
            >
              All Cases
            </Typography>
          </Link>
          <Link className={classes.link} to='/cases'>
            <Typography
              variant='h6'
              weight='medium'
              className={classes.logotype}
            >
              About
            </Typography>
          </Link>

          <div className={classes.grow} />
          <IconButton
            color='inherit'
            aria-haspopup='true'
            aria-controls='mail-menu'
            onClick={() => {
              theme.toggleTheme();
            }}
            className={classes.headerMenuButton}
          >
            <Tooltip title='Light/Dark Theme' placement='bottom-end'>
              <ColorLensIcon classes={{ root: classes.headerIcon }} />
            </Tooltip>
          </IconButton>
          {authState.isAuthorized ? (
            <ProfileMenu />
          ) : (
            <Button
              href={FENCE_LOGIN_URL}
              color='inherit'
            >
              LOGIN
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={isSidebarOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader} onClick={toggleSideBar}>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <SideBarContent />
      </Drawer>
    </React.Fragment>
  );
};
const styles = theme => ({
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
  link: {
    textDecoration: "none"
  },
  menuButton: {
    marginRight: theme.spacing.unit * 2
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: "80px"
  }
});

export default withStyles(styles)(NavBar);
