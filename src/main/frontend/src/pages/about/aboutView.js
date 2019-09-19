import React from 'react';
import { Tabs, Tab, withStyles } from '@material-ui/core';
import SteeringCommittee from '../steeringCommittee/steeringCommitteeView';
import DGAB from '../dgabPage/dgabPageView';

const About = ({ classes, currentTab }) => {
  const [value, setValue] = React.useState(currentTab);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <>
      <div className={classes.tabContainer}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          className={classes.iconsBar}
          value={value}
          onChange={handleChange}
        >
          <Tab label="Steering Committee" />
          <Tab label="DGAB" />
          <Tab label="BPSC" disabled />
        </Tabs>
        {value === 0 && <SteeringCommittee />}
        {value === 1 && <DGAB />}
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
