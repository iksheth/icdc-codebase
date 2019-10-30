import React from 'react';
import { withStyles } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { Typography } from '../../components/Wrappers/Wrappers';

const columns = [

  { name: 'file_name', label: 'Case ID', sortDirection: 'asc' },
  { name: 'file_type', label: 'Clinical Study Designation' },
  { name: 'parent', label: 'Clinical Study Type' },
  { name: 'file_description', label: 'Breed' },
  { name: 'file_format', label: 'Disease Term' },
  { name: 'file_size', label: 'Disease Stage' },
  { name: 'enrolment_age', label: 'Enrollment Age' },
  { name: 'sex', label: 'Sex' },
  { name: 'neutered_status', label: 'Neutered Status' },
];


const options = {
  selectableRows: false,
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
  pagination: true,
};

const data = [
];

const SelectedCases = () => (
  <Typography>
    <MUIDataTable
      title="Cases"
      data={data}
      columns={columns}
      options={options}
    />
  </Typography>
);

const styles = () => ({
});

export default withStyles(styles, { withTheme: true })(SelectedCases);
