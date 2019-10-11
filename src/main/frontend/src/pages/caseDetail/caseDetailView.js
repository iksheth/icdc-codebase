/*eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import StatsView from '../../components/Stats/StatsView';
import Widget from '../../components/Widgets/WidgetView';
import { Typography } from '../../components/Wrappers/Wrappers';

const columns = [
  { name: 'parent', label: 'parent' },
  { name: 'file_name', label: 'name', sortDirection: 'asc' },
  { name: 'file_type', label: 'type' },
  { name: 'file_description', label: 'description' },
  { name: 'file_format', label: 'format' },
  { name: 'file_size', label: 'size' },
  { name: 'md5sum', label: 'md5' },
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

const CaseDetail = ({ classes, data }) => {
  const stat = {
    numberOfStudies: 1,
    numberOfCases: 1,
    numberOfSamples: data.sampleCountOfCase,
    numberOfFiles: data.fileCountOfCase,
    numberOfBiospecimenAliquots: data.aliquotCountOfCase,
  };
  const caseDetail = data.case[0];

  const notProvided = '';
  return (
    <>
      <StatsView data={stat} />
      <div className={classes.caseCardContainer}>

        <div className={classes.caseDetailHeader}>

          <Typography variant="headline" size="sm">
            <span className={classes.warning}>
               Case Id
            </span>
            <span>
              {' '}
              {' '}
               #
              {' '}
              {caseDetail.case_id}
            </span>


            {caseDetail.patient_first_name === '' || caseDetail.patient_first_name === null
              ? '' : (
                <span>
                  <span className={classes.warning}>

                    {' '}
                Case Name :
                    {' '}
                    {' '}
                  </span>
                  <span>
                    {' '}
                    {caseDetail.patient_first_name}
                    {' '}
                  </span>
                </span>
              )}

               {caseDetail.enrollment && caseDetail.enrollment.initials !== '' && caseDetail.enrollment.initials !== null
              ? (
                <span>
                  <span className={classes.warning}>

                    {' '}
                Initials :
                    {' '}
                    {' '}
                  </span>
                  <span>
                    {' '}
                    {caseDetail.enrollment.initials}
                    {' '}
                  </span>
                </span>
              ) : ''}
          </Typography>


        </div>

        <Grid container spacing={32}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Grid container spacing={32} direction="column">
              <Grid item xs={12}>
                <Widget
                  title="DEMOGRAPHICS"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                >
                  <Grid container spacing={8}>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Breed</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {caseDetail.demographic ? caseDetail.demographic.breed : notProvided}
                            {' '}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Sex</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {' '}
                            {caseDetail.demographic ? caseDetail.demographic.sex : notProvided}
                            {' '}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                       <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Neutered Status</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {' '}
                            {caseDetail.demographic ? caseDetail.demographic.neutered_indicator : notProvided}
                            {' '}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold">Age of Enrollment</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {caseDetail.demographic
                              ? caseDetail.demographic.patient_age_at_enrollment : notProvided}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Widget>
              </Grid>

              <Grid item xs={12}>
                <Widget
                  title="DIAGNOSIS"
                  upperTitle
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                >
                  { caseDetail.diagnoses.map((diagnosis) => (
                    <Grid container spacing={8}>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography weight="bold">Disease</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography>
                              {diagnosis.disease_term
                                ? diagnosis.disease_term : notProvided}
                              {' '}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography weight="bold">Stage of Disease</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography>
                              {diagnosis.stage_of_disease
                                ? diagnosis.stage_of_disease : notProvided}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography weight="bold">Date of Diagnosis</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography>
                              {diagnosis.date_of_diagnosis
                                ? diagnosis.date_of_diagnosis : notProvided}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography weight="bold">Primary Site</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography>
                              {diagnosis.primary_disease_site
                                ? diagnosis.primary_disease_site : notProvided}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography weight="bold">Histology/Cytology</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography>
                              {diagnosis.histology_cytopathology
                                ? diagnosis.histology_cytopathology : notProvided}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography weight="bold">Histological Grade</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography>{diagnosis.histological_grade === '' ? 'Null' : diagnosis.histological_grade}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Widget>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Widget
              title="STUDY"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Assigned to Study</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {caseDetail.study
                          ? caseDetail.study.clinical_study_designation : notProvided}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Assigned to Arm</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {caseDetail.cohort
                          ? (caseDetail.cohort.study_arm
                            ? caseDetail.cohort.study_arm.arm : notProvided) : notProvided}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Assigned to Cohort</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {' '}
                        {caseDetail.cohort ? caseDetail.cohort.cohort_description : notProvided}
                        {' '}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Patient Subgroup</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {caseDetail.enrollment
                          ? caseDetail.enrollment.patient_subgroup : notProvided}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Date of Informed Consent</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {caseDetail.enrollment
                          ? caseDetail.enrollment.date_of_informed_consent : notProvided}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Date of Enrollment</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {caseDetail.enrollment
                          ? caseDetail.enrollment.date_of_registration : notProvided}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={4}>
                      <Typography weight="bold">Study Site</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {caseDetail.study ? caseDetail.study.study_sites.map((site) => (
                          <li>
                            {' '}
                            {site.site_short_name}
                            {' '}
                          </li>
                        )) : notProvided}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}> </Grid>
                <Grid item xs={12}>
                  <Typography variant="headline" color="secondary">
              AVAILABLE DATA
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={8}>
                    <Grid item xs={12}>
                      <Typography weight="bold">

                        <MUIDataTable

                          title="File View"
                          data={data.filesOfCase}
                          columns={columns}
                          options={options}
                        />

                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Widget>
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
  caseCardContainer: {
    padding: `${theme.spacing.unit * 2}px`,
    background: theme.custom.cardBackGround,

  },
  caseDetailHeader: {
    display: 'inline-flex',
    paddingTop: 'inherit',
  },
  warning: {
    color: theme.palette.warning.main,
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
});

export default withStyles(styles, { withTheme: true })(CaseDetail);
