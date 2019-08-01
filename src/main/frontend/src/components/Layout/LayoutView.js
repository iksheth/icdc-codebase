import React from 'react';
import { withStyles, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classnames from 'classnames';
import Header from '../Header/HeaderView';
import NavBar from '../NavBar/NavBarView';
import Footer from '../Footer/FooterView';
// import Sidebar from '../Sidebar';

// pages
import Dashboard from '../../pages/dashboard/dashboard';
import Cases from '../../pages/cases/cases';
import Studies from '../../pages/studies/studies';
import Programs from '../../pages/programs/programs';
import modelPage from '../../pages/modelPage/modelPageView';

const Layout = ({ classes, isSidebarOpened, toggleSidebar }) => (
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <React.Fragment>
          <Header />
           <NavBar />
           
          {/* <Sidebar />  */}
          {/* Reminder: Ajay need to replace the ICDC with env variable and change build npm to read env variable*/}
          <div className={classnames(classes.content, { [classes.contentShift]: isSidebarOpened })}>
            <Switch>
              <Route exact path="/ICDC/" component={Dashboard} />
              <Route exact path="/" component={Dashboard} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/cases" component={Cases} />
              <Route path="/programs" component={Programs} />
              <Route path="/studies" component={Studies} />
              <Route path="/modelPage" component={modelPage} />

            </Switch>
          </div>
          <Footer />
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
    background: theme.custom.bodyBackGround
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
