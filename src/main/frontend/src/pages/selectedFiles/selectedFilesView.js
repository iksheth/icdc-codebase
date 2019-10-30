import React from 'react';
import { withStyles } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { Typography } from '../../components/Wrappers/Wrappers';

const columns = [

  { name: 'file_name', label: 'File Name', sortDirection: 'asc' },
  { name: 'file_type', label: 'File Type' },
  { name: 'parent', label: 'Association' },
  { name: 'file_description', label: 'Description' },
  { name: 'file_format', label: 'Format' },
  { name: 'file_size', label: 'Size' },
  { name: 'md5sum', label: 'MD5' },
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
};

const data = [
];

const SelectedFiles = () => (
  <Typography>
    <MUIDataTable
      title="Files"
      data={data}
      columns={columns}
      options={options}
    />
  </Typography>
);

const styles = () => ({
});

export default withStyles(styles, { withTheme: true })(SelectedFiles);
