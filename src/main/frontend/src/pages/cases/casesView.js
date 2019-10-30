/* eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';
import Stats from '../../components/Stats/StatsController';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '../../components/Wrappers/Wrappers';
import StatsView from '../../components/Stats/StatsView';

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



const tableStyle = (ratio = 1) => ({
  width: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  overflow: 'hidden',
  wordBreak: 'break-word',
  maxWidth: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
}
);

const columns = [
  {
    name: 'case_id',
    label: 'Case ID',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(0.8)}>
          {' '}
          <Link to={`/case/${value}`}>{value}</Link>
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'study_code',
    label: 'Study Code',
    options: {
      filter: false,
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(0.6)}>
          <Link to={`/study/${value}`}>{value}</Link>
        </div>
      ),
    },
  },
  {
    name: 'study_type',
    label: 'Study Type',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(2.3)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'breed',
    label: 'Breed',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(1)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'diagnosis',
    label: 'Diagnosis',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(2)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'stage_of_disease',
    label: 'Stage of Disease',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(0.5)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'age',
    label: 'Age',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(0.5)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'sex',
    label: 'Sex',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(0.5)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'neutered_status',
    label: 'Neutered Status',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(0.8)}>
          {' '}
          {value}
          {' '}
        </div>
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

const CasesView = ({ classes, data }) => {
  const stat = {
    numberOfStudies: 1,
    numberOfCases: data.caseCountOfStudy,
    numberOfSamples: data.sampleCountOfStudy,
    numberOfFiles: data.fileCountOfStudy,
    numberOfBiospecimenAliquots: data.aliguotCountOfStudy,
  };
return (
  <>
    <StatsView data={stat} />
    <div className={classes.tableContainer} >
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
                    <span> All Cases</span>
                  </Typography>
                </span>
              </div>
            </div>
          </div>
  

    <div className={classes.tableDiv} >
    <Grid container spacing={32} >
      <Grid item xs={12}>
       <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          data={data.caseOverview}
          columns={columns}
          options={options(classes)}
        />
         </MuiThemeProvider>
      </Grid>
    </Grid>
    </div>
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
  root: {
    textTransform: 'uppercase',
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#eee',
  },
  header: {
     background: '#eee',
     paddingLeft: '20px',
    paddingRight: '50px',
     borderBottom: 'black 10px solid',
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
   position: 'absolute',
    marginTop: '52px',
  },
  logo: {
    position:'absolute',
    float:'left',
    marginTop: '30px',
    zIndex: '999',
  },
  tableContainer: {
    background: '#eee',
     paddingBottom: '50px',
  },
  tableDiv:{
    maxWidth: '1440px',
    margin: 'auto',
  },
});

export default withStyles(styles, { withTheme: true })(CasesView);