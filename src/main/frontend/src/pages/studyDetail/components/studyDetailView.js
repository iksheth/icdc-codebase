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
import StatsView from '../../../components/Stats/StatsView';
import { Typography, Button } from '../../../components/Wrappers/Wrappers';
import { customSorting } from '../../../utils/dashboardUtilFunctions';
import cn from '../../../utils/classNameConcat';
import icon from '../../../assets/icons/Icon-StudiesDetail.svg';
function studyDetailSorting(a, b) {
  if (b && !a) {
    return -1;
  }
  if (!b && a) {
    return 1;
  }
  const aNumber = a.match(/(\d+)/) ? a.match(/(\d+)/)[0] : undefined;
  const bNumber = b.match(/(\d+)/) ? b.match(/(\d+)/)[0] : undefined;
  if (aNumber && bNumber) {
    if (parseInt(bNumber, 10) > parseInt(aNumber, 10)) {
      return -1;
    }
    if (parseInt(bNumber, 10) < parseInt(aNumber, 10)) {
      return 1;
    }
  }

  return customSorting(a, b, 'alphabetical', 0);
}

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
          onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
          // eslint-disable-next-line no-shadow
          onChangePage={(_, page) => changePage(page)}
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
      arm: arm.arm || arm.arm === '' ? arm.arm : 'This study is not divided into arms',
      description: arm.description ? arm.description : '',
      does: '',
      cohortDescription: '',
    };
    let arrayDoes = [];
    const arrayCohortDes = [];
    arm.cohorts.forEach((cohort) => {
      if (cohort.cohort_dose
            && cohort.cohort_dose !== ''
            && cohort.cohort_dose !== null) {
        arrayDoes.push(cohort.cohort_dose);
      }
      if (cohort.cohort_description
            && cohort.cohort_description !== ''
              && cohort.cohort_description !== null) {
        arrayCohortDes.push(cohort.cohort_description);
      }
    });

    if (arrayDoes.length === 0) {
      if (arrayCohortDes.length === 0) {
        cohortAndDosing.does = 'This study is not divided into cohorts';
      } else {
        arrayDoes = arrayCohortDes;
        cohortAndDosing.does = arrayDoes.sort((a, b) => studyDetailSorting(a, b)).join('#');
      }
    } else {
      cohortAndDosing.does = arrayDoes.sort((a, b) => studyDetailSorting(a, b)).join('#');
    }

    cohortAndDosingTableData.push(cohortAndDosing);
  });

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
                  {' '}
                  <span>
                    {' '}
                    Study : {studyData.clinical_study_designation}
                  </span>
              </span>
            </div>
            <div className={cn(classes.headerMSubTitle,classes.headerSubTitleCate)}>
                <span>
                  {' '}
                  {studyData.clinical_study_name}
                </span>

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
            <Link className={classes.headerButtonLink} to={`/study_cases/${studyData.clinical_study_designation}`}>
              <Button className={classes.button}>
                FILTER CASES
                FOR THIS STUDY
              </Button>
            </Link>
          </div>
        </div>


        <div className={classes.detailContainer}>

          <Grid container spacing={8}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Grid container spacing={16} direction="row" className={classes.detailContainerLeft}>
                <Grid item xs={12} >
                    <span className={classes.detailContainerHeader}>Description</span>
                </Grid>
                <Grid item xs={12} >
                     <span className={classes.content}>{studyData.clinical_study_description}</span>
                </Grid>

                 <Grid container spacing={8} className={classes.detailContainerItems}>
                    <Grid item xs={12} className={classes.detailContainerItem}>
                       <span className={classes.title}> Study Type:</span>
                    </Grid>
                    <Grid item xs={12} spacing={0} className={classes.content}>
                        {studyData.clinical_study_type}
                    </Grid>
                    <Grid item xs={12} className={classes.detailContainerItem}>
                        <span className={classes.title}>Principal Investigators:</span>
                    </Grid>
                    <Grid item xs={12} className={classes.content}>
                        {studyData.principal_investigators ? studyData.principal_investigators.map((principalInvestigator) => <li>{principalInvestigator}</li>) : ''}
                    </Grid>
                    <Grid item xs={12} className={classes.detailContainerItem}>
                        <span className={classes.title}>Date of IACUC Approval:</span>
                    </Grid>
                    <Grid item xs={12} className={classes.content}>
                        {studyData.date_of_iacuc_approval}
                    </Grid>
                    <Grid item xs={12} className={classes.detailContainerItem}>
                        <span className={classes.title}>Conducted:</span>
                    </Grid>
                    <Grid item xs={12} className={classes.content}>
                        {studyData.dates_of_conduct}
                    </Grid>
              </Grid>
            </Grid>
           </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Grid container spacing={32} direction="row" className={classes.detailContainerRight}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                   <Grid container spacing={8}>
                    <Grid item xs={12}>
                      <Typography>
                        <span className={classes.detailContainerHeader}>DIAGNOSES</span>
                      </Typography>
                    </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                      {diagnoses.sort((a, b) => customSorting(a, b, 'alphabetical')).map((diagnosis) => (
                        <Grid item xs={12} >
                            <span className={classes.content}>
                              {' '}
                              {diagnosis}
                            </span>
                        </Grid>
                      ))}
                    </Grid>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Grid container spacing={8} >
                    <Grid item xs={12}>
                      <Typography>
                        <span className={classes.detailContainerHeader}>[DIAGNOSIS] FILE TYPE</span>
                      </Typography>
                    </Grid>
                  </Grid>
                    <Grid container spacing={8}>
                      {fileTypes.sort((a, b) => customSorting(a, b, 'alphabetical')).map((fileType) => (
                        <Grid item xs={12}>
                          <span className={classes.content}>{fileType}</span>
                        </Grid>
                      ))}
                    </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div className={classes.tableContainer}>

          <div className={classes.tableDiv}>
            <div className={classes.tableTitle}>
              <Typography>
                <span className={classes.tableHeader}>COHORT AND DOSING</span>
              </Typography>
            </div>
            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Typography >
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
  paddingLeft8: {
    paddingLeft: '8px',
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
    paddingLeft: '85px',
    paddingRight: '50px',
    borderBottom: '#81a6b9 4px solid',
    height: '70px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '95px',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#0296c9',
    fontSize: '19px',
    height:'12px',
    lineHeight:'17px',
  },
  headerSubTitleCate: {
    color: '#606061',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12pt',
  },
  headerSubTitleContent: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12pt',
  },
  headerMSubTitle: {
    paddingTop: '5px',
  },
  headerNav: {
    paddingTop: '5px',
    color: '#5e8ca5',
    paddingBottom: '8px',

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
 
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-5px',
    width: '85px',
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    paddingTop: '35px',
    paddingLeft: '70px',
    paddingRight: '50px',
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
    color: '#0296c9',
  },
  detailContainerBottom: {
    borderTop: '#81a6b9 1px solid',
    marginTop: '13px',
    padding: ' 35px 0 63px 0px !important',
  },
  detailContainerLeft: {
    display:'block',
    padding: '0px 20px 0 50px !important',
    minHeight: '510px',
    maxHeight: '510px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  detailContainerRight: {
    padding: '0 0 0 80px !important',
    borderLeft: '#81a6b9 1px solid',
    minHeight: '510px',
    maxHeight: '510px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  tableContainer: {
    background: '#f3f3f3',
  },
  tableHeader: {
    color: '#0296c9',
  },
  tableDiv: {
    padding: '60px',
    maxWidth: theme.custom.maxContentWidth,
    margin: '20px auto auto auto',
  },
   headerButton: {
    float: 'right',
    paddingTop: '15px',
  },
  headerButtonLink: {
    textDecoration: 'none',
  },
  button: {
    borderRadius: '22px',
    padding: '0 22px',
    width: '125px',
    height: '35px',
    lineHeight: '10px',
    fontSize: '10px',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#ff8a00',
    fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#ff8a00',
    },
  },
  detailContainerItems: {
    paddingTop: '35px',
    paddingLeft: '7px',
  },
  detailContainerItem:{
    paddingTop: '15px !important',
  },
  title: {
    color: '#0296c9',
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

export default withStyles(styles, { withTheme: true })(StudyDetailView);
