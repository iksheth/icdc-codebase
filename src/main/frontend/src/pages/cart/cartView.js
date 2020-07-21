/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import icon from '../../assets/icons/Icon-MyCases.svg';
import CustomFooter from './customFooter';
import SkeletonTable from './components/skeletonTable'

const tableStyle = (ratio = 1) => ({
  width: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  overflow: 'hidden',
  wordBreak: 'break-word',
  maxWidth: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  minWidth: '80px',
}
);

const cartView = ({ classes, data , isLoading}) => {

  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });
  function openSnack(value1) {
    setsnackbarState({ open: true, value: value1 });
  }
  function closeSnack() {
    setsnackbarState({ open: false });
  }

  const saveButton = useRef(null);

  useEffect(() => {
    saveButton.current.disabled = true;
    saveButton.current.style.color = '#FFFF';
    saveButton.current.style.backgroundColor = '#C53B27';
    saveButton.current.style.opacity = '0.3';
    saveButton.current.style.border = '3px solid grey';
    saveButton.current.style.fontWeight = '600';
    saveButton.current.style.cursor = 'auto';
  });

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

      return `${'ICDC File Manifest'} ${todaysDate} ${hours}-${minutes}-${seconds}${'.csv'}`;
    }

    function convertToCSV(jsonse) {
      const objArray = jsonse;
      const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      array.map((entry, index) => {
        let line = '';
        Object.keys(entry).map((keyName) => {
          if (line !== '') line += ',';
          line += entry[keyName];
          return line;
        });

        if (index === 0) {
          str = ['Case ID', 'File Name', 'File ID', 'Md5sum', 'User Comments'].join(',');
          str += `\r\n${line},${document.getElementById('multiline-user-coments').value}\r\n`;
        } else {
          str += `${line}\r\n`;
        }
        return str;
      });

      return str;
    }

    function downloadJson() {
      const jsonse = JSON.stringify(globalData);
      const csv = convertToCSV(jsonse);
      const data = new Blob([csv], { type: 'text/csv' });
      const JsonURL = window.URL.createObjectURL(data);
      let tempLink = '';
      tempLink = document.createElement('a');
      tempLink.setAttribute('href', JsonURL);
      tempLink.setAttribute('download', fileName());
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }


  function onRowsSelect(curr, allRowsSelected) {

    allRowsSelected.forEach(row=>{
      selectedFileIDs.push(data[row.dataIndex]["uuid"])
    })
    // filter out the duplicate file ids.
    selectedFileIDs = [...new Set(selectedFileIDs)];

    if (allRowsSelected.length === 0) {
      saveButton.current.disabled = true;
      saveButton.current.style.color = '#FFFFFF';
      saveButton.current.style.backgroundColor = '#C53B27';
      saveButton.current.style.opacity = '0.3';
      saveButton.current.style.border = '3px solid grey';
      saveButton.current.style.fontWeight = '600';
      saveButton.current.style.cursor = 'auto';
    } else {
      saveButton.current.disabled = false;
      saveButton.current.style.color = '#FFFFFF';
      saveButton.current.style.backgroundColor = '#C53B27';
      saveButton.current.style.cursor = 'pointer';
      saveButton.current.style.opacity = 'unset';
      saveButton.current.style.border = 'unset';
    }

  }

    const columns = [

      {
        name: 'case_id',
        label: 'Case ID',
        sortDirection: 'asc',
        options: {
          customBodyRender: (value) => (
            <div className="mui_td" style={tableStyle(1.5)}>
              {' '}
              {value}
              {' '}
            </div>
          ),
        },
      },
      {
        name: 'file_name',
        label: 'File Name',
        sortDirection: 'asc',
        options: {
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
        name: 'file_type',
        label: 'File Type',
        options: {
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
        name: 'parent',
        label: 'Association',
        options: {
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
        name: 'file_description',
        label: 'Description',
        options: {
          customBodyRender: (value) => (
            <div className="mui_td" style={tableStyle(2.5)}>
              {' '}
              {value}
              {' '}
            </div>
          ),
        },
      },
      {
        name: 'file_format',
        label: 'Format',
        options: {
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
        name: 'file_size',
        label: 'Size',
        options: {
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

    const options = () => ({
      selectableRows: true,
      search: false,
      filter: false,
      searchable: false,
      print: false,
      download: false,
      viewColumns: false,
      pagination: true,
      onRowsSelect: (curr, allRowsSelected) => this.onRowsSelect(curr, allRowsSelected),
      customToolbarSelect: (selectedRows, displayData) => {
        const dataIndex = Object.keys(selectedRows.data).map((keyVlaue) => (
          selectedRows.data[keyVlaue].index
        ));

        const keysToInclude = [0, 1, 7, 8];

        // NOTE:  displayData[keyVlaue].data[value] is getting values in Object format
        // instead of Value format, Due to use of "customBodyRender function"
        const selectedFiles = dataIndex.map((keyVlaue) => (
          keysToInclude.map((value) => (displayData[keyVlaue].data[value]))
        ));

        globalData = selectedFiles.map((obj) => ({
          caseId: obj[0].props.children[1],
          fileName: obj[1].props.children[1],
          uuid: obj[2],
          md5Sum: obj[3],
        }));
        return '';
      },
      customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
        <CustomFooter
          className={classes.customFooterStyle}
          text="DOWNLOAD MANIFEST"
          label="User Comments"
          onClick={downloadJson}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
      // eslint-disable-next-line no-shadow
          onChangePage={(_, page) => changePage(page)}
        />
      ),
    });


    function divStyle(isLoading){
      let css = {
          position: 'absolute',
          marginTop: '-47px',
          marginLeft: '30px',
          display: 'none',
        };
      if(isLoading==false){
        css["display"] = 'block';
      }
      return css;
  };

    const btnStyle={
      color: 'rgba(0, 0, 0,0.26)',
      boxShadow: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      padding: '6px 16px',
      fontSize: '0.875rem',
      minWidth: '64px',
      boxSizing: 'border-box',
      transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      lineHeight: '1.75',
      fontWeight: '500',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      borderRadius: '4px',
      textTransform: 'uppercase',
    };



    const dataTable = isLoading ?  <SkeletonTable /> :
            <MUIDataTable
              data={data}
              columns={columns}
              options={options()}
              className={classes.tableStyle}
            />

  return (
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={icon}
                alt="ICDC case detail header logo"
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span>
                  <span>My Cases: Files</span>
                </span>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>

          <div className={classes.tableWrapper} id="table_selected_files">
            { dataTable }
            <div style={divStyle(isLoading)}>
              <button
                type="button"
                style={btnStyle}
                ref={saveButton}
                onClick={downloadJson}
              >
                download manifest
              </button>
            </div>
          </div>
        </Grid>

      </Grid>
    );
  }

const styles = (theme) => ({
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '14px',
    width: '100px',
  },
  tableWrapper: {
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    paddingTop: '30px',
    margin: 'auto auto 30px auto',
    maxWidth: '1440px',
    background: '#f3f3f4',
    paddingBottom: '30px',
  },
  tableStyle: {
    maxWidth: '1440px',
    margin: '0 30px',
  },
  customFooterStyle: {
    background: '#f3f3f4',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#ff8a00',
    fontSize: '25px',
    lineHeight: '125px',
    paddingLeft: '5px',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    paddingLeft: '3px',
  },
  tableTitleWizard: {
    width: '500px',
    float: 'right',
    paddingTop: '20px',
  },
  header: {
    paddingLeft: '32px',
    paddingRight: '32px',
    borderBottom: '#81a6b9 4px solid',
    height: '100px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
});
export default withStyles(styles, { withTheme: true })(cartView);
