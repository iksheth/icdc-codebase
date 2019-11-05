import React from 'react';
import { Tabs, Tab, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SteeringCommittee from '../steeringCommittee/steeringCommitteeView';
import DGAB from '../dgabPage/dgabPageView';
import BPSC from '../bpsc/bpscView';
import Stats from '../../components/Stats/AllStatsController';

const About = ({ classes, currentTab }) => {
  const [value, setValue] = React.useState(currentTab);
  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <>
      <Stats />
      <div className={classes.tabContainer}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          className={classes.iconsBar}
          value={value}
          onChange={handleChange}
        >
          <Tab label="Steering Committee" component={Link} to="/steeringCommittee" />
          <Tab label="DGAB" component={Link} to="/dgab" />
          <Tab label="BPSC" component={Link} to="/bpsc" />
        </Tabs>
        {value === 0 && <SteeringCommittee />}
        {value === 1 && <DGAB />}
        {value === 2 && <BPSC />}
      </div>
    </>
  );
};

const styles = () => ({
  tabContainer: {
    margin: '16px auto',
    maxWidth: '900px',
  },
});

About.defaultProps = {
  currentTab: 0,
};

export default withStyles(styles, { withTheme: true })(About);
