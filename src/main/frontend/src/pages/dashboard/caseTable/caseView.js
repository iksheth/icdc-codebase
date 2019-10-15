/* eslint-disable */
import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';
import CustomFooter from './customFooter';

const columns = [
  {
    name: 'case_id',
    label: 'Case ID',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <Link to={`/case/${value}`}>{value}</Link>
      ),
    },
  },
  {
    name: 'study_code',
    label: 'Study Code',
    options: {
      filter: false,
      customBodyRender: (value) => (
        <Link to={`/study/${value}`}>{value}</Link>
      ),
    },
  },
  { name: 'study_type', label: 'Study Type' },
  { name: 'breed', label: 'Breed' },
  { name: 'diagnosis', label: 'Diagnosis' },
  { name: 'stage_of_disease', label: 'Stage of Disease' },
  { name: 'age', label: 'Age' },
  { name: 'sex', label: 'Sex' },
  { name: 'neutered_status', label: 'Neutered Status' },
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

const dataFilter= (row,filters) => {
  if(filters.length===0){
    return true;
  };
  let display = false;
  filters.forEach(function(filer){
      if(filer.groupName === "Breeds"){
         if(row.breed===filer.name){
          return display = true 
        }
      }
    })
  return display ;
}

const Cases = ({ data, filters }) => (
  <>
    <Grid container spacing={32}>
      <Grid item xs={12}>
        <MUIDataTable
          title={data.title ? data.title : 'All Cases'}
          data={data.filter(d=> (dataFilter(d,filters)))}
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
