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
import StatsView from '../../components/Stats/StatsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import icon from '../../assets/icons/Icon-CaseDetail.svg';
import cn from '../../utils/classNameConcat';
import {  useDispatch } from 'react-redux';
import { singleCheckBox,fetchDataForDashboardDataTable } from '../dashboard/dashboardState';

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
          onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
          // eslint-disable-next-line no-shadow
          onChangePage={(_, page) => changePage(page)}
        />
      </TableRow>
    </TableFooter>
  ),
});


const CaseDetail = ({ classes, data }) => {


  const initDashboardStatus =() => {
      return (dispatch, getState) => {
         return Promise.resolve(dispatch(fetchDataForDashboardDataTable()));
      }}

    const dispatch = useDispatch();
    const redirectTo=(study)=>{
    dispatch(initDashboardStatus()).then((result) => {
       dispatch(singleCheckBox([{
        groupName: "Study",
        name: study,
        datafield: "study_code",
        isChecked: true,
      }]));
    });
   }

  const stat = {
    numberOfStudies: 1,
    numberOfCases: 1,
    numberOfSamples: data.sampleCountOfCase,
    numberOfFiles: data.fileCountOfCase,
    numberOfBiospecimenAliquots: data.aliquotCountOfCase,
  };
  const caseDetail = data.case[0];

  const notProvided = '';

  const breadCrumb = (       <div className={classes.headerNav}>
              <Link className={classes.headerNavLink} to="/programs">
                    ALL PROGRAMS
              </Link>
    /
              <Link className={classes.headerNavLink} to={"/study/"+caseDetail.study.clinical_study_designation}>
                    {caseDetail.study.clinical_study_designation} Detail
              </Link>
    /
              <Link className={classes.headerNavLink} to="/" onClick={()=>redirectTo(caseDetail.study.clinical_study_designation)}>
                    {caseDetail.study.clinical_study_designation} CASES
              </Link>   
    /
              <Link className={classes.headerNavLink} >
                    {caseDetail.case_id} 
              </Link>
            </div>
            )




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
         
             {(caseDetail.patient_first_name === '' || caseDetail.patient_first_name === null)
             &&
             !(caseDetail.enrollment && caseDetail.enrollment.initials !== '' && caseDetail.enrollment.initials !== null)
              ? (
            <div className={classes.headerTitle}>
            <div className={cn(classes.headerMainTitle,classes.marginTop23)}>
              <span>
                <span> Case :{' '} {caseDetail.case_id}
                </span>
              </span>
            </div>

            {breadCrumb}
          </div>
          )

              : ( 
            <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle}>
              <span>
                <span> Case :{' '} {caseDetail.case_id}
                </span>
              </span>
            </div>
                 <div className={cn(classes.headerMSubTitle,classes.headerSubTitleCate)}>
              {caseDetail.patient_first_name === '' || caseDetail.patient_first_name === null
                ? '' : (
                  <span>
                    <span className={classes.headerSubTitleCate}>
                    CASE NAME
                      {' '}
                      {' '}
                      {' '}
-
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
                    <span className={cn(
                      classes.headerSubTitleCate, classes.paddingLeft8, classes.paddingBottm17,
                    )}
                    >
                      INITIALS
                      {' '}
                    </span>
                    <span className={classes.headerSubTitleContent}>
                      {caseDetail.enrollment.initials}
                    </span>
                  </span>
                ) : ''}

            </div>

             {breadCrumb}
          </div>
                )}


        </div>





        <div className={classes.detailContainer}>

          <Grid container spacing={8}>

            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.detailContainerLeft}>
              <Grid container spacing={32} direction="column">
                <Grid item xs={12} pt={100}>
                  <span className={classes.detailContainerHeader}>DEMOGRAPHICS</span>
                </Grid>

                <Grid container spacing={8} className={classes.detailContainerItems}>
                  <Grid item xs={12}>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                          {' '}
                          <span className={classes.title}>BREED</span>
                      </Grid>
                      <Grid item xs={8} className={classes.content}>
                          {caseDetail.demographic ? caseDetail.demographic.breed : notProvided}
                          {' '}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                          <span className={classes.title}>Sex</span>
                      </Grid>
                      <Grid item xs={8} className={classes.content}>
                          {' '}
                          {caseDetail.demographic ? caseDetail.demographic.sex : notProvided}
                          {' '}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                          <span className={classes.title}>Neutered Status</span>
                      </Grid>
                      <Grid item xs={8} className={classes.content}>
                          {' '}
                          {caseDetail.demographic
                            ? caseDetail.demographic.neutered_indicator : notProvided}
                          {' '}
                      </Grid>
                    </Grid>
                  </Grid>


                  <Grid item xs={12}>
                    <Grid container spacing={8}>
                      <Grid item xs={4}>
                          <span className={classes.title}>Age at Enrollment</span>
                      </Grid>
                      <Grid item xs={8} className={classes.content}>
                          {caseDetail.demographic
                            ? caseDetail.demographic.patient_age_at_enrollment : notProvided}
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.detailContainerRight}>
              <Grid container spacing={32} direction="column">
                <Grid item xs={12}>
                    <span className={classes.detailContainerHeader}>DIAGNOSIS</span>
                </Grid>

                { caseDetail.diagnoses.map((diagnosis) => (
                  <Grid container spacing={8} className={classes.detailContainerItems}>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <span className={classes.title}>Disease</span>
                        </Grid>
                        <Grid item xs={8} className={classes.content}>
                            {diagnosis.disease_term
                              ? diagnosis.disease_term : notProvided}
                            {' '}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <span className={classes.title}>Stage of Disease</span>
                        </Grid>
                        <Grid item xs={8} className={classes.content}>
                            {diagnosis.stage_of_disease
                              ? diagnosis.stage_of_disease : notProvided}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <span className={classes.title}>Date of Diagnosis</span>
                        </Grid>
                        <Grid item xs={8} className={classes.content}>
                            {diagnosis.date_of_diagnosis
                              ? diagnosis.date_of_diagnosis : notProvided}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <span className={classes.title}>Primary Site</span>
                        </Grid>
                        <Grid item xs={8} className={classes.content}>
                            {diagnosis.primary_disease_site
                              ? diagnosis.primary_disease_site : notProvided}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <span className={classes.title}>Histology/Cytology</span>
                        </Grid>
                        <Grid item xs={8} className={classes.content}>
                            {diagnosis.histology_cytopathology
                              ? diagnosis.histology_cytopathology : notProvided}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <span className={classes.title}>Histological Grade</span>
                        </Grid>
                        <Grid item xs={8} className={classes.content}>
                          {diagnosis.histological_grade === '' || diagnosis.histological_grade === null ? 
                          '' : diagnosis.histological_grade}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}

              </Grid>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.detailContainerBottom}>
              <Grid container spacing={32} direction="column">
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Grid container spacing={32} direction="column">
                    <Grid item xs={12}>
                        <span className={classes.detailContainerHeader}>STUDY</span>
                    </Grid>
                    <Grid container spacing={8} className={classes.detailContainerItems}>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                              <span className={classes.title}>Assigned to Study</span>
                          </Grid>
                          <Grid item xs={8} className={classes.content}>
                              {caseDetail.study
                                ? caseDetail.study.clinical_study_designation : notProvided}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                              <span className={classes.title}>Assigned to Arm</span>
                          </Grid>
                          <Grid item xs={8} className={classes.content}>
                              {caseDetail.cohort
                                ? (caseDetail.cohort.study_arm
                                  ? caseDetail.cohort.study_arm.arm : notProvided) : notProvided}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                              <span className={classes.title}>Assigned to Cohort</span>
                          </Grid>
                          <Grid item xs={8} className={classes.content}>
                              {' '}
                              {caseDetail.cohort
                                ? caseDetail.cohort.cohort_description : notProvided}
                              {' '}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                              <span className={classes.title}>Patient Subgroup</span>
                          </Grid>
                          <Grid item xs={8} className={classes.content}>
                              {caseDetail.enrollment
                                ? caseDetail.enrollment.patient_subgroup : notProvided}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                              <span className={classes.title}>Date of Informed Consent</span>
                          </Grid>
                          <Grid item xs={8} className={classes.content}>
                              {caseDetail.enrollment
                                ? caseDetail.enrollment.date_of_informed_consent : notProvided}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                              <span className={classes.title}>Date of Enrollment</span>
                          </Grid>
                          <Grid item xs={8} className={classes.content}>
                              {caseDetail.enrollment
                                ? caseDetail.enrollment.date_of_registration : notProvided}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={4}>
                              <span className={classes.title}>Study Site</span>
                          </Grid>
                          <Grid item xs={8} className={classes.content} >
                              {caseDetail.study ? caseDetail.study.study_sites.map((site) => (
                                <li>
                                  {' '}
                                  {site.site_short_name}
                                  {' '}
                                </li>
                              )) : notProvided}
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

        <div className={classes.tableContainer}>

          <div className={classes.tableDiv}>
            <div className={classes.tableTitle}>
                <span className={classes.tableHeader}>AVAILABLE DATA</span>
            </div>
            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                    <MUIDataTable
                      data={data.filesOfCase}
                      columns={columns}
                      options={options(classes)}
                    />
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
  paddingLeft8: {
    paddingLeft: '12px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  container: {
    paddingTop: '50px',
    fontFamily: 'Raleway, sans-serif',

  },
  content:{
    fontSize: '12px',
    lineHeight: '14px',
  },
  marginTop23:{
    marginTop:'23px',
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
    paddingLeft: '16px',
    paddingRight: '16px',
    borderBottom: '#81a6b9 4px solid',
    height: '75px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },

   headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '95px',
    paddingLeft: '3px',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#ff8a00',
    fontSize: '19px',
    height:'12px',
    lineHeight:'17px',
    paddingLeft: '5px',
  },
  headerMSubTitle: {
    paddingTop: '11px',
  },
  headerSubTitleCate: {
    color: '#606061',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12px',
    maxHeight: '25px',
    overflow: 'hidden',
    paddingLeft: '3px',
  },
  headerSubTitleContent: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12px',
    paddingLeft: '3px',
  },

  headerNav: {
    paddingTop: '8px',
    color: '#5e8ca5',
    paddingBottom: '12px',
  },
  headerNavLink: {
    paddingLeft: '6px',
    paddingRight: '6px',
    textDecoration: 'none',
    color: '#5e8ca5',
    textTransform: 'uppercase',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '9px',
    letterSpacing: '0.025em',

  },
  headerButton: {
    float: 'right',
    paddingTop: '50px',
  },
 logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-3px',
    width: '85px',
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    paddingTop: '8px',
    paddingLeft: '31px',
    paddingRight: '31px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size:'12px',
    lineHeight: '23px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#ff8a00',
  },
  detailContainerBottom: {
    borderTop: '#81a6b9 1px solid',
    marginTop: '8px',
    padding: ' 35px 0 63px 0px !important',
  },
  detailContainerLeft: {
    padding: '35px 0px 0 0px !important',
    minHeight: '300px',
  },
  detailContainerRight: {
    padding: '5px 0 5px 20px !important',
    padding: '35px 0 40px 80px !important',
    minHeight: '300px',
    borderLeft: '#81a6b9 1px solid',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  tableHeader: {
    color: '#ff8a00',
  },
  tableDiv: {
    padding: '31px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
  headerButtonLink: {
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
    '&:hover': {
      backgroundColor: '#ff8a00',
    },
  },
  detailContainerItems: {
    paddingTop: '5px',
    paddingLeft: '17px',
  },
  title: {
    color: '#9d9d9c',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#ff17f15',
    paddingBottom: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(CaseDetail);
