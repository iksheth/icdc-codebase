import React from 'react';
import { withStyles, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classnames from 'classnames';
import About from '../../pages/about/aboutView';
import Header from '../Header/HeaderView';
import NavBar from '../NavBar/NavBarView';
import Footer from '../Footer/FooterView';
import Error from '../../pages/error/Error';

// import Sidebar from '../Sidebar';

// pages

import Dashboard from '../../pages/dashboard/dashboardController';
import CaseDetail from '../../pages/caseDetail/caseDetailController';
import Cases from '../../pages/cases/casesController';
import Studies from '../../pages/studies/studiesController';
import Programs from '../../pages/programs/programController';
import modelPage from '../../pages/modelPage/modelPageView';
import table from '../../pages/table/tableView';
import SteeringCommittee from '../../pages/steeringCommittee/steeringCommitteeRoute';
import DGAB from '../../pages/dgabPage/dgbaRoute';
import BPSC from '../../pages/bpsc/bpscRoute';
import StudyDetail from '../../pages/studyDetail/studyDetailController';


const drawerWidth = 240;

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};
const Layout = ({ classes }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <>
          <Header />
          {/* <Sidebar /> */}
          <NavBar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          {/* <Sidebar />  */}
          {/* Reminder: Ajay need to replace the ICDC with env variable and
          change build npm to read env variable */}
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: isSidebarOpen,
            })}
          >
            <Route component={ScrollToTop} />
            <Switch>
              <Route exact path="/ICDC/" component={Dashboard} />
              <Route exact path="/" component={Dashboard} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/cases" component={Cases} />
              <Route path="/programs" component={Programs} />
              <Route path="/studies" component={Studies} />
              <Route path="/modelPage" component={modelPage} />
              <Route path="/table" component={table} />
              <Route path="/steeringCommittee" component={SteeringCommittee} />
              <Route path="/bpsc" component={BPSC} />

              <Route
                path="/dgab"
                component={DGAB}
              />

              <Route path="/about" component={About} />
              <Route path="/study/:id" component={StudyDetail} />
              <Route path="/case/:id" component={CaseDetail} />
              <Route path="/study_cases/:id" component={Cases} />

              <Route component={Error} />
            </Switch>
          </div>
          <Footer />
        </>
      </BrowserRouter>
    </>
  );
};

const styles = (theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    // width: `calc(100vw - 240px)`,   // Ajay need to add this on addung side bar
    width: 'calc(100vw)', // Remove this on adding sidebar
    background: theme.custom.bodyBackGround,
  },
  contentShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

export default withStyles(styles)(Layout);
