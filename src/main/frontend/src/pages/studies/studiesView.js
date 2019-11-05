/* eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';

import Stats from '../../components/Stats/AllStatsController';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '../../components/Wrappers/Wrappers';

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
  {
    name: 'clinical_study_designation',
    label: 'Study Code',
    options: {
      filter: false,
      customBodyRender: (value) => (
        <Link to={`/study/${value}`}>{value}</Link>
      ),
    },
  },
  { name: 'program_id', label: 'Program' },
  { name: 'clinical_study_name', label: 'Study Name' },
  { name: 'clinical_study_type', label: 'Study Type' },
  { name: 'numberOfCases', label: 'Cases' },
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
  rowsPerPageOptions: [10, 25, 50, 100],
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

const Studies = ({ classes,data  }) => (
  <>
    <Stats />
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
                    <span> All Studies</span>
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
          data={data.studiesByProgram}
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

export default withStyles(styles, { withTheme: true })(Studies);
