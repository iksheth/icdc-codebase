
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
  { name: 'file_name', label: 'name' },
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
  return (
    <>
      <StatsView data={stat} />
      <div className={classes.caseCardContainer}>
        <Widget
          title={`Case Detail #${caseDetail.case_id}:${caseDetail.patient_first_name}`}
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
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
                              {caseDetail.demographic.breed}
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
                              {caseDetail.demographic.sex}
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
                              {caseDetail.demographic.patient_age_at_enrollment}
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
                                {diagnosis.patient_age_at_enrollment}
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
                              <Typography>{diagnosis.stage_of_disease}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={8}>
                            <Grid item xs={4}>
                              <Typography weight="bold">Date of Diagnosis</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography>{diagnosis.date_of_diagnosis}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={8}>
                            <Grid item xs={4}>
                              <Typography weight="bold">Primary Site</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography>{diagnosis.primary_disease_site}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={8}>
                            <Grid item xs={4}>
                              <Typography weight="bold">Histology/Cytology</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography>{diagnosis.histology_cytopathology}</Typography>
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
                        <Typography>{caseDetail.study.clinical_study_designation}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                        <Typography weight="bold">Assigned to Arm</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography>{caseDetail.cohort.study_arm.arm}</Typography>
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
                          {caseDetail.cohort.cohort_description}
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
                        <Typography>{caseDetail.enrollment.patient_subgroup}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                        <Typography weight="bold">Date of Informed Consent</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography>{caseDetail.enrollment.date_of_informed_consent}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                        <Typography weight="bold">Date of Enrollment</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography>{caseDetail.enrollment.date_of_registration}</Typography>
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
                          {caseDetail.study.study_sites.map((site) => (
                            <li>
                              {' '}
                              {site.site_short_name}
                              {' '}
                            </li>
                          ))}
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
        </Widget>
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
    marginTop: '32px',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
});

export default withStyles(styles, { withTheme: true })(CaseDetail);
