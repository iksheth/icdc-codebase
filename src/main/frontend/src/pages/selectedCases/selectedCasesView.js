import React from 'react';
import { withStyles } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';
import { Typography } from '../../components/Wrappers/Wrappers';
import CustomFooter from './customFooter';

const columns = [

  {
    name: 'case_id',
    label: 'Case ID',
    sortDirection: 'asc',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div>
          {' '}
          <Link to={`/case/${value}`}>{value}</Link>
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'study_code',
    label: 'Clinical Study Designation',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div>
          {' '}
          <Link to={`/study/${value}`}>{value}</Link>
          {' '}
        </div>
      ),
    },
  },
  { name: 'study_type', label: 'Clinical Study Type' },
  { name: 'breed', label: 'Breed' },
  { name: 'diagnosis', label: 'Disease Term' },
  { name: 'stage_of_disease', label: 'Disease Stage' },
  { name: 'age', label: 'Enrollment Age' },
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
  selectedRows: {
    text: 'row(s) selected',
    delete: 'Delete',
    deleteAria: 'Delete Selected Rows',
  },
  customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
    <CustomFooter
      text="GO TO FILES"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
      // eslint-disable-next-line no-shadow
      onChangePage={(_, page) => changePage(page)}
    />
  ),
};

const SelectedCasesView = (data) => (
  <Typography>
    <MUIDataTable
      title="My Cases"
      data={data.data.casesInList}
      columns={columns}
      options={options}
    />
  </Typography>
);

const styles = () => ({
});

export default withStyles(styles, { withTheme: true })(SelectedCasesView);
