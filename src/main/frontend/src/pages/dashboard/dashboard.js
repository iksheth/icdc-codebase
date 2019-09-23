import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import Widget from '../../components/Widgets/WidgetView';
import Stats from '../../components/Stats/StatsController';
import Cases from './caseTable/caseController';
import PositionedSnackbar from '../../components/Disclaimer/DisclaimerView';
import sunburstImage from '../../assets/dashboard/dashboard_sunburst';
import BreedDonut from '../../components/Widgets/PieCharts/BreedDonut/BreedDonutController';
import DiagnosisDonut from '../../components/Widgets/PieCharts/DiagnosisDonut/DiagnosisDonutController';
import GenderDonut from '../../components/Widgets/PieCharts/GenderDonut/GenderDonutController';
import TumorDonut from '../../components/Widgets/PieCharts/TumorDonut/TumorDonut';
import DiseaseDonut from '../../components/Widgets/PieCharts/DiseaseDonut/DiseaseDonut';

const Dashboard = ({
  classes, data,
}) => (
  <>
    <Stats />
    <Grid container spacing={32}>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Widget
          title="Programs and Studies"
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
          <div className={classes.sunburst}>
            <img src={sunburstImage} alt="sunburst" />
          </div>
        </Widget>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Widget
          title="Breed"
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
          <BreedDonut data={data.caseCountByBreed} />
        </Widget>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Widget
          title="Diagnosis"
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
          <DiagnosisDonut data={data.caseCountByDiagnosis} />
        </Widget>
      </Grid>
    </Grid>
    {/* second row Grids */}
    <Grid container spacing={32}>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Widget
          title="Proposed: Primary Disease Site"
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
          <DiseaseDonut />
        </Widget>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Widget
          title="Proposed: Sex"
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
          <GenderDonut data={data.caseCountByGender} />
        </Widget>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Widget
          title="Proposed: Tumor Stage"
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
          <TumorDonut />
        </Widget>
      </Grid>
    </Grid>

    <Cases />
    {/* Addingg diclaimer for Dev */}
    <PositionedSnackbar />
  </>
);

const styles = (theme) => ({
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  sunburst: {
    textAlign: 'center',
  },
});

export default withStyles(styles, { withTheme: true })(Dashboard);
