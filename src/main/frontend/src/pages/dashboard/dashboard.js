import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import Widget from "../../components/Widgets/WidgetView";
import Stats from "../../components/Stats/StatsView";
import Cases from "./caseTable/caseController";
import PositionedSnackbar from "../../components/Disclaimer/DisclaimerView";
import sunburstImage from "../../assets/dashboard/dashboard_sunburst";
import diseaseSiteImage from "../../assets/dashboard/dashboard_proposed_disease_site.gif";
import proposedSexImage from "../../assets/dashboard/dashboard_proposed_sex.gif";
import tumorStageImage from "../../assets/dashboard/dashboard_proposed_tumor_stage.gif";
import BreedDonut from "../../components/Widgets/PieCharts/BreedDonut/BreedDonut";
import DiagnosisDonut from "../../components/Widgets/PieCharts/DiagnosisDonut/DiagnosisDonut";

const Dashboard = ({ classes, theme, ...props }) => {
  return (
    <React.Fragment>
      <Stats />
      <Grid container spacing={32}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            title='Programs and Studies'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.sunburst}>
              <img src={sunburstImage} alt='sunburst' />
            </div>
          </Widget>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            title='Breed'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <BreedDonut />
          </Widget>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            title='Diagnosis'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <DiagnosisDonut />
          </Widget>
        </Grid>
      </Grid>
      {/* second row Grids */}
      <Grid container spacing={32}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.sunburst}>
              <img src={diseaseSiteImage} alt='diseaseSiteImage' />
            </div>
          </Widget>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.sunburst}>
              <img src={proposedSexImage} alt='proposedSexImage' />
            </div>
          </Widget>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.sunburst}>
              <img src={tumorStageImage} alt='tumorStageImage' />
            </div>
          </Widget>
        </Grid>
      </Grid>

      <Cases />
      {/* Addingg diclaimer for Dev */}
      <PositionedSnackbar />
    </React.Fragment>
  );
};

const styles = theme => ({
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column"
  },
  paper: {
    textAlign: "center"
  },
  fakeToolbar: {
    ...theme.mixins.toolbar
  },
  sunburst: {
    textAlign: "center"
  }
});

export default withStyles(styles, { withTheme: true })(Dashboard);
