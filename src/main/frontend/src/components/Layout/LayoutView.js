import React from 'react';
import { withStyles, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classnames from 'classnames';
import Header from '../Header/HeaderView';
import NavBar from '../NavBar/NavBarView';
// import Sidebar from '../Sidebar';

// pages
import Dashboard from '../../pages/dashboard/dashboard';


const Layout = ({ classes, isSidebarOpened, toggleSidebar }) => (
  <React.Fragment>
    <CssBaseline />
    {/* Replace /ICDC this with env varaible */}
    <BrowserRouter basename='/ICDC'>
      <React.Fragment>
          <Header />
           <NavBar />
          {/* <Sidebar />  */}
          <div className={classnames(classes.content, { [classes.contentShift]: isSidebarOpened })}>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/case" component={Dashboard} />
            </Switch>
          </div>
      </React.Fragment>
    </BrowserRouter>
  </React.Fragment>

);

const styles = ( theme ) => ({
  root: {
    display: 'flex',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    //width: `calc(100vw - 240px)`,   // Ajay need to add this on addung side bar
    width: `calc(100vw)`,  // Remove this on adding sidebar
    minHeight: '100vh',
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing.unit * 6}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

export default withStyles(styles)(Layout);
