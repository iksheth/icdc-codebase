import React from "react";
import { Tabs, Tab, withStyles } from "@material-ui/core";
import SteeringCommittee from "../steeringCommittee/steeringCommitteeView";
import DGAB from "../dgabPage/dgabPageView";

const About = ({ classes }) => {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    console.log(newValue);
    setValue(newValue);
  }
  return (
    <React.Fragment>
      <div className={classes.tabContainer}>
      <Tabs
        indicatorColor='primary'
        textColor='primary'
        className={classes.iconsBar}
        value={value}
        onChange={handleChange}
        // onChange={props.changeActiveTabId}
      >
        <Tab label='Steering Committee' />
        <Tab label='DGAB' />
        <Tab label='BPSC' disabled />
      </Tabs>
      {value === 0 && <SteeringCommittee />}
      {value === 1 && <DGAB />}
      </div>
    </React.Fragment>
  );
};

const styles = theme => ({
  tabContainer: {
    margin: "16px auto",
    maxWidth: "900px"
  }
});

export default withStyles(styles, { withTheme: true })(About);
