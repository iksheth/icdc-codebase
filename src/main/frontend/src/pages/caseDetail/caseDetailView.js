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
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Widget from '../../components/Widgets/WidgetView';
import StatsView from '../../components/Stats/StatsView';
import { Typography, Button } from '../../components/Wrappers/Wrappers';


const tableHeader = '#EEEEEE';
const tableHeaderBorder = '#004c73 3px solid';
const tableHeaderFontColor = '#194563';
const tableFontFamily = 'Raleway, sans-serif';

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTable:{
      paper:{
      boxShadow:'none',
      },
    },
    MUIDataTableSelectCell: {
      fixedHeader: {
        position: 'relative',
      },
      headerCell: {
        borderTop: tableHeaderBorder,
        borderBottom: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,

      },
      checkboxRoot: {
        color: 'inherit',
      },
    },
    MUIDataTableBodyRow: {
      root: {

        '&:nth-child(even)': {
          backgroundColor: '#f5f5f5',
          color: '#5e8ca5',
        },
        '&:nth-child(odd)': {
          color: '#1c2023',
        },
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '0px',
      },
      body: {
        color: 'inherit',
        fontFamily: '"Open Sans", sans-serif',
        letterSpacing: '0.025em',
        fontStyle: 'normal',
        fontSize: '10pt',
        fontWeight: 'bold',
      },
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        borderTop: tableHeaderBorder,
        borderBottom: tableHeaderBorder,
        color: tableHeaderFontColor,
        backgroundColor: tableHeader,
        textDecoration: 'underline',
        fontFamily: tableFontFamily,
        letterSpacing: '0.025em',
        fontStyle: 'normal',
        fontSize: '11pt',
        fontWeight: 'bold',
      },
      sortActive: {
        color: tableHeaderFontColor,
      },
      toolButton: {
        cursor: 'pointer',
        display: 'inline-flex',
        outline: 'none',

      },
    },
    MUIDataTableToolbar: {
      root: {
        backgroundColor: tableHeader,
      },
      titleText: {
        color: tableHeaderFontColor,
        fontSize: '25.2pt',
        fontFamily: tableFontFamily,
        letterSpacing: '0.025em',
        fontStyle: 'normal',
      },
    },
  },
});


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
            src="https://img.icons8.com/dusk/64/000000/4-circle.png"  
            alt="ICDC case detail header logo"
            />
            
            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span>
                  <Typography weight="bold" variant="h3">
                    {' '}
                    <span className={classes.warning}>{caseDetail.case_id}</span>
                  </Typography>
                </span>
              </div>
              <div className={classes.headerMSubTitle}>
                {caseDetail.patient_first_name === '' || caseDetail.patient_first_name === null
                  ? '' : (
                    <span>
                      <span className={classes.headerSubTitleCate}>

                        {' '}
                    CASE NAME -
                        {' '}
                        {' '}
                      </span>
                      <span className={classes.headerSubTitleContent}>
                        {' '}
                        {caseDetail.patient_first_name}
                        {' '}
                      </span>
                    </span>
                  )}

                {caseDetail.enrollment && caseDetail.enrollment.initials !== '' && caseDetail.enrollment.initials !== null
                  ? (
                    <span>
                      <span className={classes.headerSubTitleCate}>

                        {' '}
                    INITIALS -
                        {' '}
                        {' '}
                      </span>
                      <span className={classes.headerSubTitleContent}>
                        {' '}
                        {caseDetail.enrollment.initials}
                        {' '}
                      </span>
                    </span>
                  ) : ''}

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
              <Link to="/"><Button  className={classes.button}>ADD TO MY CASES</Button></Link>
            </div>
          </div>


          <div className={classes.detailContainer}>

            <Grid container  spacing={8} >

              <Grid item lg={6} md={6} sm={6} xs={12} className={classes.detailContainerLeft}>
                <Grid container spacing={32} direction="column">
                  <Grid item xs={12} pt={100}>
                    <Typography variant="h4" ><span className={classes.warning}>DEMOGRAPHICS</span></Typography>
                  </Grid>

                   <Grid container spacing={8}  className={classes.detailContainerItems}>
                  <Grid item xs={12}>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                        <Typography  weight="bold"> <span className={classes.title}>BREED</span></Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography weight="bold">
                          {caseDetail.demographic ? caseDetail.demographic.breed : notProvided}
                          {' '}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                        <Typography weight="bold"><span className={classes.title}>Sex</span></Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography weight="bold">
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
                        <Typography weight="bold"><span className={classes.title}>Neutered Status</span></Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography weight="bold">
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
                        <Typography weight="bold"><span className={classes.title}>Age of Enrollment</span></Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography weight="bold">
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
                            <Typography weight="bold"><span className={classes.title}>Disease</span></Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography weight="bold">
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
                            <Typography weight="bold"><span className={classes.title}>Stage of Disease</span></Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography weight="bold">
                              {diagnosis.stage_of_disease
                                ? diagnosis.stage_of_disease : notProvided}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography weight="bold"><span className={classes.title}>Date of Diagnosis</span></Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography weight="bold">
                              {diagnosis.date_of_diagnosis
                                ? diagnosis.date_of_diagnosis : notProvided}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography weight="bold"><span className={classes.title}>Primary Site</span></Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography weight="bold">
                              {diagnosis.primary_disease_site
                                ? diagnosis.primary_disease_site : notProvided}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography weight="bold"><span className={classes.title}>Histology/Cytology</span></Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography weight="bold">
                              {diagnosis.histology_cytopathology
                                ? diagnosis.histology_cytopathology : notProvided}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                            <Typography weight="bold"><span className={classes.title}>Histological Grade</span></Typography>
                          </Grid>
                          <Grid item xs={8} weight="bold">
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
                          <Typography weight="bold"><span className={classes.title}>Assigned to Study</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography weight="bold">
                            {caseDetail.study
                              ? caseDetail.study.clinical_study_designation : notProvided}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold"><span className={classes.title}>Assigned to Arm</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography weight="bold">
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
                          <Typography weight="bold"><span className={classes.title}>Assigned to Cohort</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography weight="bold">
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
                          <Typography weight="bold"><span className={classes.title}>Patient Subgroup</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography weight="bold">
                            {caseDetail.enrollment
                              ? caseDetail.enrollment.patient_subgroup : notProvided}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold"><span className={classes.title}>Date of Informed Consent</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography weight="bold">
                            {caseDetail.enrollment
                              ? caseDetail.enrollment.date_of_informed_consent : notProvided}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold"><span className={classes.title}>Date of Enrollment</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography weight="bold">
                            {caseDetail.enrollment
                              ? caseDetail.enrollment.date_of_registration : notProvided}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                          <Typography weight="bold"><span className={classes.title}>Study Site</span></Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography weight="bold">
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
                          <Typography weight="bold">
                           <MuiThemeProvider theme={getMuiTheme()}>
                            <MUIDataTable
                              data={data.filesOfCase}
                              columns={columns}
                              options={options(classes)}
                            />
                             </MuiThemeProvider>
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
    minHeight:'400px',
    maxHeight:'380px',
  },
  detailContainerRight:{
    padding:'0 0 50px 80px !important',
    minHeight:'400px',
    maxHeight:'380px',
    borderLeft: 'black 3px solid',
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

export default withStyles(styles, { withTheme: true })(CaseDetail);
