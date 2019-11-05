/* eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { Link } from 'react-router-dom';
import Widget from '../../../components/Widgets/WidgetView';
import StatsView from '../../../components/Stats/StudyDetailStatsView';
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

const options = (classes) => ({
  selectableRows: false,
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
  pagination: true,
  customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
    <TableFooter>
      <TableRow>
        <TablePagination
          className={classes.root}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={changePage}
          onChangeRowsPerPage={changeRowsPerPage}
        />
      </TableRow>
    </TableFooter>
  ),
});


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
      <StatsView data={stat} study={studyData.clinical_study_designation} />
      <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.logo}>
            <img 
            src="https://img.icons8.com/dusk/64/000000/4-circle.png"  
            alt="ICDC case detail header logo"
            />
            
            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span>
                  <Typography weight="bold" variant="h3">
                    {' '}
                    <span className={classes.warning}> {studyData.clinical_study_designation}</span>
                  </Typography>
                </span>
              </div>
              <div className={classes.headerMSubTitle}>
                <Typography weight="bold" >
                    <span > {studyData.clinical_study_name}</span>
                </Typography>


              </div>
              <div className={classes.headerNav}>
                <Link to="/">ALL PROGRAM</Link>
    /
                <Link to="/">STUDIES</Link>
    /
                <Link to="/">CASES</Link>

              </div>
            </div>
            <div className={classes.headerButton}>
              <Link to={`/study_cases/${studyData.clinical_study_designation}`}><Button color="secondary">{studyData.clinical_study_designation} CASES</Button></Link>
            </div>
          </div>


          <div className={classes.detailContainer}>

            <Grid container  spacing={8} >
              <Grid item lg={6} md={6} sm={6} xs={12} className={classes.detailContainerLeft}>
                <Grid container spacing={32} direction="column">
                  <Grid item xs={12} pt={100}>
                    <Typography variant="h4" ><span className={classes.warning}>SUMMARY</span></Typography>
                  </Grid>
                   <Grid item xs={12} pt={100}>
                    <Typography>
                      {studyData.clinical_study_description}
                      <br />
                    </Typography>
                  </Grid>

                  <Grid container spacing={8}  className={classes.detailContainerItems}>
                  <Grid item xs={12}>
                     <Grid item xs={12} pt={100}>
                      <Typography>
                       Study Type:
                      </Typography>
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

                  </Grid>
                </Grid>
              </Grid>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12} className={classes.detailContainerRight}>
                <Grid container spacing={32} direction="column">
                    <Grid item lg={6} md={6} sm={6} xs={12} >
                    <Grid container spacing={32} direction="column">
                      <Grid item xs={12}>
                        <Typography variant="h4" ><span className={classes.warning}>DIAGNOSIS</span></Typography>
                      </Grid>

                      {diagnoses.map((diagnosis) => (
                        <Grid container spacing={8} >
                          <Grid item xs={12}>
                           <Typography weight="bold" ><span>{diagnosis}</span></Typography>
                          </Grid>
                        </Grid>
                      ))}

                    </Grid>
                  </Grid>

                  <Grid item lg={6} md={6} sm={6} xs={12} >
                    <Grid container spacing={32} direction="column">
                      <Grid item xs={12}>
                        <Typography variant="h4" ><span className={classes.warning}>DIAGNOSIS</span></Typography>
                      </Grid>

                     {fileTypes.map((fileType) => (
                        <Grid container spacing={8} >
                          <Grid item xs={12}>
                           <Typography weight="bold" ><span>{fileType}</span></Typography>
                          </Grid>
                        </Grid>
                      ))}

                    </Grid>
                  </Grid>
               </Grid>
              </Grid>
            </Grid>
          </div>

          <div className={classes.tableContainer} >

             <div className={classes.tableDiv} >
                <div className={classes.tableTitle} >
                    <Typography variant="h4" ><span className={classes.warning}>COHORT AND DOSING</span></Typography>
                </div> 
                <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={12}>
                          <Typography weight="bold">
                            <MUIDataTable
                              data={cohortAndDosingTableData}
                              columns={columns}
                              options={options(classes)}
                            />
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography />
                        </Grid>
                      </Grid>
                </Grid>
            </div> 
          </div>
        </div>
    </>
  );
};

const styles = (theme) => ({
  container: {
    fontFamily:'Raleway, sans-serif',
   
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
  root: {
    textTransform: 'uppercase',
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#eee',
  },
  header: {
    background: '#fff',
     paddingLeft: '50px',
    paddingRight: '50px',
     borderBottom: 'black 3px solid',
    height: '90px',
    maxWidth: '1440px',
    margin: 'auto',
  },
  headerTitle: {
    maxWidth: '1440px',
    margin: 'auto',
    float:'left',
    marginLeft: '90px',
  },
  headerMainTitle:{

  },
  headerSubTitleCate:{
    color: '#555',
    fontWeight: 'bold',
  },
  headerSubTitleContent:{
    color: '#000',
    fontWeight: 'bold',
  },
  headerMSubTitle: {
    paddingTop: '5px',
  },
  headerNav: {
    paddingTop: '10px',
    letterSpacing: '0.25px',
  },
  headerButton: {
    float:'right',
    paddingTop:'50px',
  },
  logo: {
    position:'absolute',
    float:'left',
    marginTop: '39px',
  },
  detailContainer: {
    maxWidth: '1440px',
    margin: 'auto',
    paddingTop:'50px',
    paddingLeft: '70px',
    paddingRight: '70px',
  },
  detailContainerBottom:{
    borderTop: 'black 3px solid',
    marginTop: '30px',
     padding:' 50px 0 50px 0px !important',
  },
  detailContainerLeft:{
    padding:'0px 0px 0 50px',
    minHeight:'600px',
    maxHeight:'580px',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  detailContainerRight:{
    padding:'0 0 50px 80px !important',
    borderLeft: 'black 3px solid',
     minHeight:'600px',
    maxHeight:'580px',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  tableContainer: {
    background: '#eee',
  },
  tableDiv:{
    padding:'50px',
    maxWidth: '1440px',
    margin: 'auto',
  },
  button: {
    borderRadius: '10px',
    width: '178px',
    height: '27px',
    lineHeight: '18px',
    fontSize: '10pt',
    color: '#fff',
    backgroundColor: '#ff7f15',
  },
  detailContainerItems:{
    paddingTop:'5px',
    paddingLeft: '17px',
  },
  title:{
    color:'#aaa',
  },
  tableTitle:{
    paddingBottom:'20px',
  }
});

export default withStyles(styles, { withTheme: true })(StudyDetailView);
