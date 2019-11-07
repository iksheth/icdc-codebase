/* eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
  MenuItem,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { Link} from 'react-router-dom';
import Widget from '../../components/Widgets/WidgetView';
import StatsView from '../../components/Stats/StatsView';
import { Typography, Button } from '../../components/Wrappers/Wrappers';
import icon from '../../assets/icons/Icon-CaseDetail.svg';

const columns = [

  { name: 'file_name', label: 'File Name', sortDirection: 'asc' },
  { name: 'file_type', label: 'File Type' },
  { name: 'parent', label: 'Association' },
  { name: 'file_description', label: 'Description' },
  { name: 'file_format', label: 'Format' },
  { name: 'file_size', label: 'Size' },
  { name: 'md5sum', label: 'MD5' },
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
      <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.logo}>
            <img 
            src={icon}  
            alt="ICDC case detail header logo"
            />
            
            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span>
                    <span >Case : {caseDetail.case_id}</span>
                </span>
              </div>
              <div className={classes.headerMSubTitle}>
                {caseDetail.patient_first_name === '' || caseDetail.patient_first_name === null
                  ? '' : (
                    <span>
                      <span className={classes.headerSubTitleCate}>
                    CASE NAME {' '} -
                        {' '}
                      </span>
                      <span className={classes.headerSubTitleContent}>
                        {caseDetail.patient_first_name}
                      </span>
                    </span>
                  )}
                {caseDetail.enrollment && caseDetail.enrollment.initials !== '' && caseDetail.enrollment.initials !== null
                  ? (
                    <span>
                      <span className={classes.headerSubTitleCate,classes.paddingLeft8,classes.paddingBottm17}>
                      INITIALS {' '}-{' '}
                      </span>
                      <span className={classes.headerSubTitleContent}>
                        {caseDetail.enrollment.initials}
                      </span>
                    </span>
                  ) : ''}

              </div>
              <div className={classes.headerNav}>
                <Link className={classes.headerNavLink} to="/">
                    ALL PROGRAM  
                 </Link>
    /
                <Link className={classes.headerNavLink} to="/">
                    STUDIES
                </Link>
    /
                <Link className={classes.headerNavLink} to="/">
                    CASES
                </Link>

  
              </div>
            </div>
            <div className={classes.headerButton}>
              <Link className={classes.headerButtonLink} to="/"><Button  className={classes.button}>ADD TO MY CASES</Button></Link>
            </div>
          </div>


          <div className={classes.detailContainer}>

            <Grid container  spacing={8} >

              <Grid item lg={6} md={6} sm={6} xs={12} className={classes.detailContainerLeft}>
                <Grid container spacing={32} direction="column">
                  <Grid item xs={12} pt={100}>
                    <span className={classes.detailContainerHeader}>DEMOGRAPHICS</span>
                  </Grid>

                   <Grid container spacing={8}  className={classes.detailContainerItems}>
                  <Grid item xs={12}>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                        <Typography  > <span className={classes.title}>BREED</span></Typography>
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
                        <Typography ><span className={classes.title}>Sex</span></Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography >
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
                        <Typography ><span className={classes.title}>Neutered Status</span></Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography >
                          {' '}
                          {caseDetail.demographic
                            ? caseDetail.demographic.neutered_indicator : notProvided}
                          {' '}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>


                  <Grid item xs={12}>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                        <Typography ><span className={classes.title}>Age of Enrollment</span></Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography >
                          {caseDetail.demographic
                            ? caseDetail.demographic.patient_age_at_enrollment : notProvided}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                 </Grid>
                </Grid>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12} className={classes.detailContainerRight}>
                <Grid container spacing={32} direction="column">
                  <Grid item xs={12}>
                    <Typography variant="h4" ><span className={classes.warning}>DIAGNOSIS</span></Typography>
                  </Grid>

                  { caseDetail.diagnoses.map((diagnosis) => (
                    <Grid container spacing={8} className={classes.detailContainerItems}>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography ><span className={classes.title}>Disease</span></Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography >
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
                            <Typography ><span className={classes.title}>Stage of Disease</span></Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography >
                              {diagnosis.stage_of_disease
                                ? diagnosis.stage_of_disease : notProvided}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography ><span className={classes.title}>Date of Diagnosis</span></Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography >
                              {diagnosis.date_of_diagnosis
                                ? diagnosis.date_of_diagnosis : notProvided}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography ><span className={classes.title}>Primary Site</span></Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography >
                              {diagnosis.primary_disease_site
                                ? diagnosis.primary_disease_site : notProvided}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography ><span className={classes.title}>Histology/Cytology</span></Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography >
                              {diagnosis.histology_cytopathology
                                ? diagnosis.histology_cytopathology : notProvided}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography ><span className={classes.title}>Histological Grade</span></Typography>
                          </Grid>
                          <Grid item xs={8} >
                            <Typography>{diagnosis.histological_grade === '' || diagnosis.histological_grade === null ? '' : diagnosis.histological_grade}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}

                </Grid>
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12} className={classes.detailContainerBottom}>
                <Grid container spacing={32} direction="column" >
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Grid container spacing={32} direction="column" >
                    <Grid item xs={12}>
                      <Typography variant="h4" ><span className={classes.warning}>STUDY</span></Typography>
                    </Grid>
                    <Grid container spacing={8} className={classes.detailContainerItems}>
                    <Grid item xs={12}>
                      <Grid container spacing={8} >
                        <Grid item xs={4}>
                          <Typography ><span className={classes.title}>Assigned to Study</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography >
                            {caseDetail.study
                              ? caseDetail.study.clinical_study_designation : notProvided}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography ><span className={classes.title}>Assigned to Arm</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography >
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
                          <Typography ><span className={classes.title}>Assigned to Cohort</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography >
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
                          <Typography ><span className={classes.title}>Patient Subgroup</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography >
                            {caseDetail.enrollment
                              ? caseDetail.enrollment.patient_subgroup : notProvided}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography ><span className={classes.title}>Date of Informed Consent</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography >
                            {caseDetail.enrollment
                              ? caseDetail.enrollment.date_of_informed_consent : notProvided}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography ><span className={classes.title}>Date of Enrollment</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography >
                            {caseDetail.enrollment
                              ? caseDetail.enrollment.date_of_registration : notProvided}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography ><span className={classes.title}>Study Site</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography >
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
                  </Grid>
              </Grid>
              </Grid>
               </Grid>
              </Grid>
            </Grid>
          </div>

          <div className={classes.tableContainer} >

             <div className={classes.tableDiv} >
                <div className={classes.tableTitle} >
                    <Typography variant="h4" ><span className={classes.warning}>AVAILABLE DATA</span></Typography>
                </div> 
                <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={12}>
                          <Typography >
                            <MUIDataTable
                              data={data.filesOfCase}
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
  paddingLeft8:{
    paddingLeft:'8px',
  },
  paddingBottm17:{
    paddingBottm:'17px',
  },
  container: {
    paddingTop: '50px',
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
    background: '#f3f3f3',
  },
  header: {
    paddingLeft: '50px',
    paddingRight: '50px',
    borderBottom: '#81a6b9 4px solid',
    height: '100px',
    maxWidth:theme.custom.maxContentWidth,
    margin: 'auto',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float:'left',
    marginLeft: '120px',

  },
  headerMainTitle:{
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color:"#ff8a00",
    fontSize:'19pt',
  },
  headerSubTitleCate:{
    color: '#606061',
    fontWeight: 'bold',
    fontFamily:theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize:'12pt',
  },
  headerSubTitleContent:{
    color: '#000000',
    fontWeight: 'bold',
    fontFamily:theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize:'12pt',
  },
  headerMSubTitle: {
    paddingTop: '5px',
  },
  headerNav: {
    paddingTop: '17px',
    color:'#5e8ca5',
    paddingBottom: '8px',
  
  },
  headerNavLink: {
   paddingLeft:'6px',
   paddingRight:'6px',
   textDecoration: 'none',
   color:'#5e8ca5',
   textTransform: 'uppercase',
   fontFamily:theme.custom.fontFamilySans,
   fontSize:'9pt',
   letterSpacing: '0.025em',

  },
  headerButton: {
    float:'right',
    paddingTop:'50px',
  },
  logo: {
    position:'absolute',
    float:'left',
    marginTop: '-5px',
    width:'113px',
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    paddingTop:'35px',
    paddingLeft: '70px',
    paddingRight: '70px',
    fontFamily:theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color:'#000000',

  },
  detailContainerHeader:{
    textTransform: 'uppercase',
   fontFamily:theme.custom.fontFamilySans,
   fontSize:'17pt',
   letterSpacing: '0.017em',
   color:'#ff8a00',
  },
  detailContainerBottom:{
    borderTop: '#81a6b9 1px solid',
    marginTop: '13px',
    padding:' 35px 0 63px 0px !important',
  },
  detailContainerLeft:{
    padding:'0px 0px 0 50px',
    minHeight:'400px',
    maxHeight:'380px',
  },
  detailContainerRight:{
    padding:'0 0 40px 80px !important',
    minHeight:'400px',
    maxHeight:'380px',
    borderLeft: '#81a6b9 1px solid',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  tableDiv:{
    padding:'60px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
  headerButtonLink:{
    textDecoration: 'none',
  },
  button: {
    borderRadius: '10px',
    width: '178px',
    height: '27px',
    lineHeight: '18px',
    fontSize: '10pt',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#ff8a00',
    fontFamily: theme.custom.fontFamilySans,
    "&:hover": {
      backgroundColor: '#ff8a00',
    },
  },
  detailContainerItems:{
    paddingTop:'5px',
    paddingLeft: '17px',
  },
  title:{
    color:'#9d9d9c',
   fontFamily:theme.custom.fontFamilySans,
   fontSize: '12pt',
   letterSpacing: '0.017em',
   fontWeight:'600',
  },
  tableTitle:{
    fontFamily:theme.custom.fontFamilySans,
    fontSize: '17pt',
    letterSpacing: '0.017em',
    color:'#ff17f15',
    paddingBottom:'20px',
  }
});

export default withStyles(styles, { withTheme: true })(CaseDetail);
