import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import Widget from '../../components/Widgets/WidgetView';
import Stats from '../../components/Stats/StatsController';
import Cases from './caseTable/caseController';
import PositionedSnackbar from '../../components/Disclaimer/DisclaimerView';
import sunburstImage from '../../assets/dashboard/dashboard_sunburst.png';
import BreedDonut from '../../components/Widgets/PieCharts/BreedDonut/BreedDonutController';
import DiagnosisDonut from '../../components/Widgets/PieCharts/DiagnosisDonut/DiagnosisDonutController';
import GenderDonut from '../../components/Widgets/PieCharts/GenderDonut/GenderDonutController';
import TumorDonut from '../../components/Widgets/PieCharts/TumorDonut/TumorDonutController';
import DiseaseDonut from '../../components/Widgets/PieCharts/DiseaseDonut/DiseaseDonutController';

const Dashboard = ({
  classes, data,
}) => (
  <>
    <Stats />
    <Grid container spacing={32} className={classes.donutContainer}>
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
          <BreedDonut
            data={data.caseCountByBreed}
            width={400}
            height={200}
            innerRadius={50}
            outerRadius={85}
            cx="50%"
            cy="50%"
          />
        </Widget>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Widget
          title="Diagnosis"
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
          <DiagnosisDonut
            data={data.caseCountByDiagnosis}
            width={400}
            height={200}
            innerRadius={50}
            outerRadius={85}
            cx="50%"
            cy="50%"
          />
        </Widget>
      </Grid>
    </Grid>
    {/* second row Grids */}
    <Grid container spacing={32} className={classes.donutContainer}>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Widget
          title="Disease Site"
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
          <DiseaseDonut
            data={data.caseCountByDiseaseSite}
            width={400}
            height={200}
            innerRadius={50}
            outerRadius={85}
            cx="50%"
            cy="50%"
          />
        </Widget>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Widget
          title="Sex"
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
          <GenderDonut
            data={data.caseCountByGender}
            width={400}
            height={200}
            innerRadius={50}
            outerRadius={85}
            cx="50%"
            cy="50%"
          />
        </Widget>
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={12}>
        <Widget
          title="Tumor Stage"
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
          <TumorDonut
            data={data.caseCountByStageOfDisease}
            width={400}
            height={200}
            innerRadius={50}
            outerRadius={85}
            cx="50%"
            cy="50%"
          />
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
  donutContainer: {
    background: '#bcbcbc',
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
