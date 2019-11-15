import React from 'react';
import queryString from 'query-string';
import { withRouter, NavLink } from 'react-router-dom';
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import {
  ColorLens as ColorLensIcon,
} from '@material-ui/icons';
import classnames from 'classnames';
import caseIcon from '../../assets/icons/Icon-MyCases.svg';
import funnelIcon from '../../assets/icons/CasesDashboard.Filter-icon.svg';
// import ProfileMenu from '../ProfileMenu/ProfileMenuView';
import SideBarContent from '../SideBar/SideBarView';
import { useTheme } from '../ThemeContext';

const drawerWidth = 240;
// const FENCE_LOGIN_URL = process.env.FENCE_LOGIN_URL;
// const FENCE_LOGIN_URL = process.env.REACT_APP_LOGIN_URL;
const BACKEND_GETUSERINFO_API = process.env.REACT_APP_BACKEND_GETUSERINFO_API;

const NavBar = ({
  classes, isSidebarOpened, toggleSidebar, location,
}) => {
  const theme = useTheme();
  const [authState, setAuthState] = React.useState({
    isAuthorized: localStorage.getItem('isAuthorized') === 'true',
  });

  // Similar to componentDidMount and componentDidUpdate:
  // Empty second argument of react useEffect will avoid the infinte loop that
  // caused due to component update
  React.useEffect(() => {
    const values = queryString.parse(window.location.search);

    if (values.code) {
      fetch(BACKEND_GETUSERINFO_API + values.code)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((result) => {
          setAuthState({
            ...authState,
            isAuthorized: true,
          });
          localStorage.setItem('username', JSON.stringify(result.user));
          localStorage.setItem('isAuthorized', 'true');
        })
        .catch(() => {
          // Ajay Need to update this
          // setAuthState(
          //  { ...authState, username: "", isAuthorized: false }
          //  );
          // localStorage.setItem("isAuthorized", "false");
        });
    }
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        className={classnames(classes.appBar, {
          [classes.appBarShift]: isSidebarOpened,
        })}
        color="primary"
      >
        <Toolbar className={classes.toolbar}>

          {/* Sidebar button */}
          <div>
            { ((location.pathname === '/dashboard')
        || (location.pathname === '/')) && (
        <Button
          variant="h6"
          weight="medium"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          className={classnames(classes.menuButton, classes.logotype, {
            [classes.hide]: isSidebarOpened,
          })}
          classes={{ root: classes.iconButtonRoot }}
        >
          <img
            className={classes.cartLogoImg}
            src={funnelIcon}
            alt="cart_logo"
          />
        </Button>
            )}
          </div>
          {/* End Sidebar button */}
          <div className={classes.buttonContainer}>
            <NavLink
              className={classes.link}
              activeStyle={{ borderBottom: '2px solid  #39C0F0' }}
              to="/home"
            >
              <Button variant="h6" weight="medium" className={classes.logotype} classes={{ root: classes.buttonRoot }}>
              home
              </Button>
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{ borderBottom: '2px solid  #39C0F0' }}
              to="/dashboard"
            >
              <Button variant="h6" weight="medium" className={classes.logotype} classes={{ root: classes.buttonRoot }}>
              Cases
              </Button>
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{ borderBottom: '2px solid  #39C0F0' }}
              to="/programs"
            >
              <Button variant="h6" weight="medium" className={classes.logotype} classes={{ root: classes.buttonRoot }}>
                Programs
              </Button>
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{ borderBottom: '2px solid  #39C0F0' }}
              to="/studies"
            >
              <Button variant="h6" weight="medium" className={classes.logotype} classes={{ root: classes.buttonRoot }}>
               Studies
              </Button>
            </NavLink>
            <NavLink
              className={classes.link}
              activeStyle={{ borderBottom: '2px solid  #39C0F0' }}
              to="/about"
            >
              <Button variant="h6" weight="medium" className={classes.logotype} classes={{ root: classes.buttonRoot }}>
              About
              </Button>
            </NavLink>
          </div>
          {/* <div className={classes.grow} /> */}
          <IconButton
            color="inherit"
            aria-haspopup="true"
            aria-controls="mail-menu"
            onClick={() => {
              theme.toggleTheme();
            }}
            className={classes.headerMenuButton}
            classes={{ root: classes.iconButtonRoot }}
          >
            <Tooltip title="Light/Dark Theme" placement="bottom-end">
              <ColorLensIcon classes={{ root: classes.headerIcon }} />
            </Tooltip>
          </IconButton>
          <NavLink
            className={classes.link}
            to="/myCases"
          >
            <IconButton
              color="inherit"
              aria-haspopup="true"
              aria-controls="mail-menu"
              className={classes.headerMenuButton}
              classes={{ root: classes.iconButtonRoot }}
            >
              <Tooltip title="Cases" placement="bottom-end">
                <img
                  className={classes.cartLogoImg}
                  src={caseIcon}
                  alt="cart_logo"
                />
              </Tooltip>
            </IconButton>
          </NavLink>
          {/* Login button functionality on Navigation bar */}

          {/* {authState.isAuthorized ? (
            <ProfileMenu />
          ) : (
            <Button href={FENCE_LOGIN_URL} color="inherit">
              LOGIN
            </Button>
          )} */}
          {/* End Login button functionality on Navigation bar */}

        </Toolbar>
      </AppBar>
      { ((location.pathname === '/dashboard')
        || (location.pathname === '/')) && (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={isSidebarOpened}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader} onClick={toggleSidebar}>
            <IconButton classes={{ root: classes.iconCartButtonRoot }}>
              <img
                className={classes.cartLogoImg}
                src={funnelIcon}
                alt="cart_logo"
              />
            </IconButton>
          </div>
          <Divider />
          <SideBarContent />
        </Drawer>
      )}
    </>
  );
};


const styles = (theme) => ({
  logotype: {
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '11px',
    fontWeight: '600',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  buttonContainer: {
    margin: '0 auto',
  },
  appBar: {
    marginTop: '80px',
    width: '100vw',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  cartLogoImg: {
    width: '20px',
    height: '20px',
  },
  hide: {
    display: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  messageContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerMenu: {
    marginTop: theme.spacing.unit * 7,
  },
  headerMenuList: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerMenuItem: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  headerMenuButton: {
    marginLeft: theme.spacing.unit * 2,
    padding: theme.spacing.unit / 2,
  },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing.unit * 2,
  },
  headerIcon: {
    fontSize: 20,
  },
  headerIconCollapse: {
    color: 'white',
  },
  profileMenu: {
    minWidth: 265,
  },
  profileMenuUser: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 2,
  },
  profileMenuItem: {
    color: theme.palette.text.hint,
  },
  profileMenuIcon: {
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.text.hint,
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  messageNotification: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.background.light,
    },
  },
  messageNotificationSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: theme.spacing.unit * 2,
  },
  messageNotificationBodySide: {
    alignItems: 'flex-start',
    marginRight: 0,
  },
  sendMessageButton: {
    margin: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    textTransform: 'none',
  },
  sendButtonIcon: {
    marginLeft: theme.spacing.unit * 2,
  },
  link: {
    textDecoration: 'none',
  },
  menuButton: {
    marginRight: theme.spacing.unit * 2,
  },
  appBarShift: {
    width: '100%',
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
    marginTop: '79px',
    zIndex: '1201',
  },
  toolbar: {
    minHeight: 39,
    alignItems: 'flex-start',
  },
  buttonRoot: {
    padding: '11px 10px',
  },
  iconButtonRoot: {
    paddingTop: '11px',
  },
});

export default withRouter(withStyles(styles)(NavBar));
