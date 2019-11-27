import React from 'react';
import { withStyles } from '@material-ui/core';
import MUIDataTable from 'mui-custom-datatables';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography } from '../../components/Wrappers/Wrappers';
import CustomFooter from './customFooter';
import { deleteCasesAction } from './selectedCasesState';

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
    label: 'Study Code',
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
  { name: 'study_type', label: 'Study Type' },
  { name: 'breed', label: 'Breed' },
  { name: 'diagnosis', label: 'Diagnosis' },
  { name: 'stage_of_disease', label: 'Stage of Disease' },
  { name: 'age', label: 'Age' },
  { name: 'sex', label: 'Sex' },
  { name: 'neutered_status', label: 'Neutered Status' },
];

const options = (dispatch, cases) => ({
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

  onRowsDelete: (rowsDeleted) => {
    // dispatch(rowsDeleted.map(e=>(cases.)))
    if (rowsDeleted.data.length > 0) {
      return dispatch(deleteCasesAction(
        rowsDeleted.data.map((row) => cases[row.dataIndex].case_id),
      ));
    }
    return true;
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
});

const SelectedCasesView = (data) => (
  <Typography>
    <MUIDataTable
      title="My Cases"
      data={data.data}
      columns={columns}
      options={options(useDispatch(), data.data)}
    />
  </Typography>
);

const styles = () => ({
});

export default withStyles(styles, { withTheme: true })(SelectedCasesView);
