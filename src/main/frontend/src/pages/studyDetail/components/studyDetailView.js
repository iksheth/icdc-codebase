import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';
import StatsView from '../../../components/Stats/StatsView';
import Widget from '../../../components/Widgets/WidgetView';
import { Typography, Button } from '../../../components/Wrappers/Wrappers';

const columns = [
  { name: 'arm', label: 'Arms' },
  {
    name: 'description',
    label: 'Description',
    options: {
      customBodyRender: (value) => (
        value.split('#').map((desc) => (desc === '' ? '' : <li style={{ listStyleType: 'none' }}>{desc}</li>))
      ),
    },
  },
  {
    name: 'does',
    label: 'Cohorts',
    options: {
      customBodyRender: (value) => (
        value.split('#').map((desc) => (desc === '' ? '' : <li style={{ listStyleType: 'none' }}>{desc}</li>))
      ),
    },
  },
];

const options = {
  selectableRows: false,
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
  pagination: true,

};

const StudyDetailView = ({ classes, data }) => {
  const studyData = data.study[0];
  const diagnoses = [...new Set(studyData.cases.reduce((output, caseData) => output.concat(caseData.diagnoses ? caseData.diagnoses.map((diagnosis) => (diagnosis.disease_term ? diagnosis.disease_term : '')) : []), []))];
  const fileTypes = [...new Set(data.filesOfStudy.map((fileOfStudy) => (fileOfStudy.file_type)))];
  const stat = {
    numberOfStudies: 1,
    numberOfCases: data.caseCountOfStudy,
    numberOfSamples: data.sampleCountOfStudy,
    numberOfFiles: data.fileCountOfStudy,
    numberOfBiospecimenAliquots: data.aliguotCountOfStudy,
  };

  const cohortAndDosingTableData = [];
  studyData.study_arms.forEach((arm) => {
    const cohortAndDosing = {
      arm: arm.arm ? arm.arm : 'This study is not divided into arms',
      description: arm.description ? arm.description : '',
      does: '',
    };
    arm.cohorts.forEach((cohort) => {
      if (cohort.cohort_dose !== '' && cohort.cohort_dose !== null) {
        cohortAndDosing.does += `${cohort.cohort_dose}#`;
      }
    });
    if (cohortAndDosing.does === '') {
      cohortAndDosing.does = 'This study is not divided into cohorts';
    }

    cohortAndDosingTableData.push(cohortAndDosing);
  });

  return (
    <>
      <StatsView data={stat} />
      <div className={classes.studyDetailContainer}>
        <div className={classes.studyDetailHeader}>
          <Typography variant="headline" color="warning" size="sm">
            {studyData.clinical_study_designation}
          </Typography>
          <Typography variant="headline" size="sm">
            {`: ${studyData.clinical_study_name}`}
          </Typography>
        </div>
        <Grid container spacing={32}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Grid container spacing={32} direction="column">
              <Grid item xs={12}>
                <Widget
                  title="SUMMARY"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  color="warning"
                >
                  <Grid item xs={12}>
                    <Typography>
                      {studyData.clinical_study_description}
                      <br />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <br />
                    <Typography weight="bold">Study Type:</Typography>
                    <br />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      {studyData.clinical_study_type}
                      <br />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <br />
                    <Typography weight="bold">Principal Investigators:</Typography>
                    <br />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      {studyData.principal_investigators ? studyData.principal_investigators.map((principalInvestigator) => <li>{principalInvestigator}</li>) : ''}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography weight="bold">IACUC Approval:</Typography>
                    <br />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      {studyData.date_of_iacuc_approval}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <br />
                    <Typography weight="bold">Study Date:</Typography>
                    <br />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      {studyData.dates_of_conduct}
                    </Typography>
                  </Grid>
                </Widget>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Widget>
              <Grid container spacing={16}>
                {/* Divding the Paper into two parts */}
                <Grid item xs={6}>
                  <Typography size="md" color="warning">
              DIAGNOSES
                  </Typography>
                  <Typography>
                    {diagnoses.map((diagnosis) => (
                      <>
                        <li style={{ listStyleType: 'none' }}>{diagnosis}</li>
                        <br />
                      </>
                    ))}
                  </Typography>
                </Grid>
                {/* End of part one */}
                {/* Divding the Paper into two parts */}
                <Grid item xs={6}>
                  <Typography size="md" color="warning">
              DATA TYPES
                  </Typography>
                  <Typography>
                    {fileTypes.map((fileType) => <li style={{ listStyleType: 'none' }}>{fileType}</li>)}
                  </Typography>
                </Grid>
                {/* End of part two */}
                {/* Divding the Paper into two parts */}
                <Grid item xs={12}>
                  <div className={classes.studyDetailButton}>
                    <Typography size="md" color="info">
                      <Link to={`/study_cases/${studyData.clinical_study_designation}`}><Button color="secondary">CASES</Button></Link>
                    </Typography>
                  </div>
                </Grid>
                {/* End of part one */}
              </Grid>
            </Widget>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={32} direction="column">
              <Grid item xs={12}>
                <MUIDataTable
                  title="COHORT AND DOSING"
                  data={cohortAndDosingTableData}
                  columns={columns}
                  options={options}
                />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </div>
    </>
  );
};

const styles = (theme) => ({
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  studyDetailHeader: {
    display: 'inline-flex',
    paddingTop: 'inherit',
    paddingBottom: '10px',
  },
  studyDetailButton: {
    float: 'right',
  },
  studyDetailContainer: {
    padding: `${theme.spacing.unit * 2}px`,
    background: theme.custom.cardBackGround,
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
});

export default withStyles(styles, { withTheme: true })(StudyDetailView);
