import React from "react";
import { Tabs, Tab, withStyles } from "@material-ui/core";
import SteeringCommittee from "../steeringCommittee/steeringCommitteeView";
import DGAB from "../dataSubmissionPage/dataSubmissionPageView";

const About = ({ classes }) => {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    console.log(newValue);
    setValue(newValue);
  }
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0
  },
  divider: {
    height: "1px",
    width: "800px"
  },
  paperRoot: {
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing.unit * 12,
    paddingBottom: theme.spacing.unit * 16,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
    maxWidth: 800
  },
  errorTextRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 500
  },
  dogHumanHelix: {
    width: 400
  }
});

export default withStyles(styles, { withTheme: true })(About);
