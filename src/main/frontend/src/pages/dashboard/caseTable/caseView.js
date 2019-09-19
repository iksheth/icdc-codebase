import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import CustomFooter from './customFooter';

const columns = [{ name: 'case_id', label: 'Case ID' },
  { name: 'study_code', label: 'Study Code' },
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

const Cases = ({ data }) => (
  <>
    <Grid container spacing={32}>
      <Grid item xs={12}>
        <MUIDataTable
          title="All Cases"
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
