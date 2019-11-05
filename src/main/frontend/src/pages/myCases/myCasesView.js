import React from 'react';
import { Tabs, Tab, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SelectedFiles from '../selectedFiles/selectedFilesView';
import SelectedCases from '../selectedCases/selectedCasesView';
import Stats from '../../components/Stats/DashboardStatsController';

const MyCases = ({ classes, currentTab }) => {
  const [value, setValue] = React.useState(currentTab);
  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <>
      <Stats />
      <div>
        <h1>My Cases</h1>
      </div>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        className={classes.iconsBar}
        value={value}
        onChange={handleChange}
      >
        <Tab label="Files" component={Link} to="/selectedfiles" />
        <Tab label="Cases" component={Link} to="/selectedcases" />
      </Tabs>
      {value === 0 && <SelectedFiles />}
      {value === 1 && <SelectedCases />}
    </>
  );
};

const styles = () => ({
});

MyCases.defaultProps = {
  currentTab: 0,
};

export default withStyles(styles, { withTheme: true })(MyCases);
