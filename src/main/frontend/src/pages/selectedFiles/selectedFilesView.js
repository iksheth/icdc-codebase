import React from 'react';
import { withStyles } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { Typography } from '../../components/Wrappers/Wrappers';
import CustomFooter from './customFooter';

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / (1024 ** i)).toFixed(dm))} ${sizes[i]}`;
}

const columns = [

  { name: 'case_id', label: 'CaseID', sortDirection: 'asc' },
  { name: 'file_name', label: 'File Name', sortDirection: 'asc' },
  { name: 'file_type', label: 'File Type' },
  { name: 'file_description', label: 'Description' },
  { name: 'file_format', label: 'Format' },
  {
    name: 'file_size',
    label: 'Size',
    options: {
      customBodyRender: (bytes) => (formatBytes(bytes)),
    },
  },
  {
    name: 'uuid',
    label: 'UUID',
    options: {
      display: false,
    },
  },
  {
    name: 'md5sum',
    label: 'Md5Sum',
    options: {
      display: false,
    },
  },
];

let globalData = [];

function fileName() {
  const date = new Date();
  const yyyy = date.getFullYear();
  let dd = date.getDate();
  let mm = (date.getMonth() + 1);

  if (dd < 10) { dd = `0${dd}`; }

  if (mm < 10) { mm = `0${mm}`; }

  const todaysDate = `${yyyy}-${mm}-${dd}`;

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) { hours = `0${hours}`; }

  if (minutes < 10) { minutes = `0${minutes}`; }

  if (seconds < 10) { seconds = `0${seconds}`; }

  return `${'File Manifest'} ${todaysDate} ${hours}-${minutes}-${seconds}`;
}

function downloadJson() {
  const jsonse = JSON.stringify(globalData);
  const data = new Blob([jsonse], { type: 'application/json' });
  const JsonURL = window.URL.createObjectURL(data);
  let tempLink = '';
  tempLink = document.createElement('a');
  tempLink.href = JsonURL;
  tempLink.setAttribute('download', fileName());
  tempLink.click();
}

const options = {
  selectableRows: true,
  search: false,
  filter: false,
  searchable: false,
  print: false,
  download: false,
  viewColumns: false,
  pagination: true,
  customToolbarSelect: (selectedRows, displayData) => {
    Object.keys(selectedRows.data).map((keyVlaue) => (
      selectedRows.data[keyVlaue].index
    ));
    const keysToInclude = [0, 1, 6, 7];
    const selectedFiles = Object.keys(selectedRows.data).map((keyVlaue) => (
      keysToInclude.map((value) => (displayData[keyVlaue].data[value]))
    ));

    globalData = selectedFiles.map((obj) => ({
      caseId: obj[0],
      fileName: obj[1],
      uuid: obj[2],
      md5Sum: obj[3],
    }));
    return (
      <></>);
  },
  customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
    <CustomFooter
      text="DOWNLOAD MANIFEST"
      onClick={downloadJson}
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
      // eslint-disable-next-line no-shadow
      onChangePage={(_, page) => changePage(page)}
    />
  ),
};

const SelectedFilesView = (data) => (
  <Typography>
    <MUIDataTable
      title="My Cases: Files"
      data={data.data.filesOfCases}
      columns={columns}
      options={options}
    />
  </Typography>
);

const styles = () => ({
});

export default withStyles(styles, { withTheme: true })(SelectedFilesView);
