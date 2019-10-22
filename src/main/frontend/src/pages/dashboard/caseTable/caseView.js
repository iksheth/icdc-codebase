/* eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import CustomFooter from './customFooter';


const tableStyle=(ratio=1) =>{ return ({
      width: document.documentElement.clientWidth * 0.6 /10 *ratio,
      overflow: 'hidden',
      wordBreak: 'break-word',
      maxWidth: document.documentElement.clientWidth * 0.6/10 *ratio,
       }
    )
}


const columns = [
  {
    name: 'case_id',
    label: 'Case ID',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => {
        return (<div className='mui_td'  style={tableStyle(0.8)}> <Link to={`/case/${value}`}>{value}</Link> </div> )
      },
    },
  },
  {
    name: 'study_code',
    label: 'Study Code',
    options: {
      filter: false,
      customBodyRender: (value) => (
        <div className='mui_td' style={tableStyle(0.6)}>
          <Link to={`/study/${value}`}>{value}</Link>
        </div>
      ),
    },
  },
  { name: 'study_type', label: 'Study Type' ,options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => {
        return (<div className='mui_td' style={tableStyle(2.3)}> {value} </div> )
      },
    },},
  { name: 'breed', label: 'Breed' ,options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => {
        return (<div className='mui_td' style={tableStyle(1)}> {value} </div> )
      },
    },},
  { name: 'diagnosis', label: 'Diagnosis',options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => {
        return (<div className='mui_td' style={tableStyle(2)} > {value} </div> )
      },
    }, },
  { name: 'stage_of_disease', label: 'Stage of Disease' ,options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => {
        return (<div className='mui_td' style={tableStyle(0.5)} > {value} </div> )
      },
    },},
  { name: 'age', label: 'Age' ,options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => {
        return (<div className='mui_td'style={tableStyle(0.5)} > {value} </div> )
      },
    },},
  { name: 'sex', label: 'Sex' ,options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => {
        return (<div className='mui_td' style={tableStyle(0.5)} > {value} </div> )
      },
    },},
  { name: 'neutered_status', label: 'Neutered Status' ,options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => {
        return (<div className='mui_td' style={tableStyle(0.8)} > {value} </div> )
      },
    },},
];




const options = {
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
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
      // eslint-disable-next-line no-shadow
      onChangePage={(_, page) => changePage(page)}
    />
  ),

};

const Cases = ({ data }) => (
  <>
    <Grid container spacing={32}>
      <Grid item xs={12}>
            <MUIDataTable
              title={data.title ? data.title : 'All Cases'}
              data={data.caseOverview}
              columns={columns}
              options={options}
            />
      </Grid>
    </Grid>
  </>
);

const styles = () => ({

});

export default withStyles(styles, { withTheme: true })(Cases);
