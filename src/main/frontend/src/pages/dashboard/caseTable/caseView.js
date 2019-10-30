import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CustomFooter from './customFooter';

const tableHeader = '#EEEEEE';
const tableHeaderBorder = '#004c73 3px solid';
const tableHeaderFontColor = '#194563';
const tableFontFamily = 'Raleway, sans-serif';

const getMuiTheme = () => createMuiTheme({
  overrides: {
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

const link = {
  color: 'inherit',
};
const tableStyle = (ratio = 1) => ({
  width: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  overflow: 'hidden',
  wordBreak: 'break-word',
  maxWidth: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  minWidth: '160px',
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
          <Link to={`/case/${value}`} style={link}>{value}</Link>
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
  selectableRows: true,
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
  pagination: true,
  customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
    <CustomFooter
      text="SAVE TO MY CASES"
      classes={classes}
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
      // eslint-disable-next-line no-shadow
      onChangePage={(_, page) => changePage(page)}
    />
  ),

});


const Cases = ({ classes, data }) => (
  <>
    <Grid container spacing={32}>
      <Grid item xs={12}>
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={data.title ? data.title : 'All Cases'}
            data={data}
            columns={columns}
            options={options(classes)}
          />
        </MuiThemeProvider>
      </Grid>
    </Grid>

  </>
);

const styles = () => ({
  root: {
    textTransform: 'uppercase',
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
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

});

export default withStyles(styles, { withTheme: true })(Cases);
