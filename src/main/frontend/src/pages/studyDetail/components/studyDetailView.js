import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import StatsView from '../../../components/Stats/StatsView';
import { Typography } from '../../../components/Wrappers/Wrappers';

const columns = [
  { name: 'arm', label: 'Arms' },
  {
    name: 'description',
    label: 'Description',
    options: {
      customBodyRender: (value) => (
        value.split('#').map((desc) => (desc === '' ? '' : <li>{desc}</li>))
      ),
    },
  },
  {
    name: 'does',
    label: 'cohorts',
    options: {
      customBodyRender: (value) => (
        value.split('#').map((desc) => (desc === '' ? '' : <li>{desc}</li>))
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
      arm: arm.arm,
      description: '',
      does: '',
    };
    arm.cohorts.forEach((cohort) => {
      cohortAndDosing.description += `${cohort.cohort_description}#`;
      cohortAndDosing.does += `${cohort.cohort_dose}#`;
    });

    cohortAndDosingTableData.push(cohortAndDosing);
  });

  return (
    <>
      <StatsView data={stat} />
      <Typography variant="headline" color="warning" size="sm">
        <p className={classes.paragraphStyle}>
          {studyData.clinical_study_designation}
        </p>
      </Typography>
      {studyData.clinical_study_name}
      <Grid container spacing={32}>
        <Grid item lg={6} md={6} sm={6} xs={12}>

          <p className={classes.paragraphStyle}>
            Summary:
          </p>
          <p>{studyData.clinical_study_description}</p>
          <p>Principal Investigators</p>
          <p>
            {' '}
            {studyData.principal_investigators ? studyData.principal_investigators.map((principalInvestigator) => <li>{principalInvestigator}</li>) : ''}
          </p>
          <p>IACUC Approval</p>
          <p>{studyData.date_of_iacuc_approval}</p>
          <p>Study Date</p>
          <p>{studyData.dates_of_conduct}</p>

        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={12}>
          <p className={classes.paragraphStyle}>
            DIAGNOSES:
          </p>
          <p>{diagnoses.map((diagnosis) => <li>{diagnosis}</li>)}</p>


        </Grid>


        <Grid item lg={3} md={3} sm={6} xs={12}>
          <p className={classes.paragraphStyle}>
            New File Type:
          </p>
          <p>
            {fileTypes.map((fileType) => <li>{fileType}</li>)}
          </p>
          <p>

            <Link to={`/study_cases/${studyData.clinical_study_designation}`}>
                Cases
            </Link>
          </p>
        </Grid>
      </Grid>
      <Grid container spacing={32}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MUIDataTable
            title="COHORT AND DOSING"
            data={cohortAndDosingTableData}
            columns={columns}
            options={options}
          />

        </Grid>
      </Grid>
    </>
  );
};

const styles = (theme) => ({
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  caseCardContainer: {
    marginTop: '32px',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
});

export default withStyles(styles, { withTheme: true })(StudyDetailView);
