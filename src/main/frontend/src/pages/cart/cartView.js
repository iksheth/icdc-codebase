/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import icon from '../../assets/icons/Icon-MyCases.svg';
import CustomFooter from './customFooter';
import SkeletonTable from './components/skeletonTable';
import { deleteFiles } from './store/cartAction';

const tableStyle = (ratio = 1) => ({
  width: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  overflow: 'hidden',
  wordBreak: 'break-word',
  maxWidth: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  minWidth: '80px',
}
);

const cartView = ({ classes, data, isLoading }) => {
  const dispatch = useDispatch();

  const deleteButton = useRef(null);
  const downloadButton = useRef(null);

  const [modalStatus, setModalStatus] = React.useState({ open: false ,selectedFiles : []});


  let globalData = [];
  let selectedFileIDs = [];


  function toggleModal(obj) {
    let status = Object.assign({}, modalStatus);
    status.open = obj.open;
    if(typeof(selectedFiles)  === "undefined" && !status.open){
      // close without empty selectedFiles, to remove teh selectedFiles
      dispatch(deleteFiles({ files: modalStatus.selectedFiles }));
      selectedFileIDs=[];
      setModalStatus({ open: false ,selectedFiles : []});
    }else{
      setModalStatus(obj);
    }

    
  }

  useEffect(() => {
    deleteButton.current.disabled = true;
    deleteButton.current.style.color = '#FFFF';
    deleteButton.current.style.backgroundColor = '#C53B27';
    deleteButton.current.style.opacity = '0.3';
    deleteButton.current.style.border = '3px solid grey';
    deleteButton.current.style.fontWeight = '600';
    deleteButton.current.style.cursor = 'auto';

    downloadButton.current.disabled = true;
    downloadButton.current.style.color = '#FFFF';
    downloadButton.current.style.backgroundColor = '#3890c5';
    downloadButton.current.style.opacity = '0.3';
    downloadButton.current.style.border = '3px solid grey';
    downloadButton.current.style.fontWeight = '600';
    downloadButton.current.style.cursor = 'auto';
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
    const exportData = new Blob([csv], { type: 'text/csv' });
    const JsonURL = window.URL.createObjectURL(exportData);
    let tempLink = '';
    tempLink = document.createElement('a');
    tempLink.setAttribute('href', JsonURL);
    tempLink.setAttribute('download', fileName());
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  function removeFiles() {
    selectedFileIDs = [...new Set(selectedFileIDs)];
    toggleModal({open:true , selectedFiles: selectedFileIDs})
  }

  function onRowsSelect(curr, allRowsSelected) {
    globalData=[];
    selectedFileIDs=[];
    allRowsSelected.forEach((row) => {
      const file = data[row.dataIndex];
      selectedFileIDs.push(file.uuid);
      globalData.push({
        caseId: file.case_id,
        fileName: file.file_name,
        uuid: file.uuid,
        md5Sum: file.md5sum,
      })
    });
    // filter out the duplicate file ids.
    selectedFileIDs = [...new Set(selectedFileIDs)];
     

    if (allRowsSelected.length === 0) {
      deleteButton.current.disabled = true;
      deleteButton.current.style.color = '#FFFFFF';
      deleteButton.current.style.backgroundColor = '#C53B27';
      deleteButton.current.style.opacity = '0.3';
      deleteButton.current.style.border = '3px solid grey';
      deleteButton.current.style.fontWeight = '600';
      deleteButton.current.style.cursor = 'auto';

      downloadButton.current.disabled = true;
      downloadButton.current.style.color = '#FFFFFF';
      downloadButton.current.style.backgroundColor = '#3890c5';
      downloadButton.current.style.opacity = '0.3';
      downloadButton.current.style.border = '3px solid grey';
      downloadButton.current.style.fontWeight = '600';
      downloadButton.current.style.cursor = 'auto';
    } else {
      deleteButton.current.disabled = false;
      deleteButton.current.style.color = '#FFFFFF';
      deleteButton.current.style.backgroundColor = '#C53B27';
      deleteButton.current.style.cursor = 'pointer';
      deleteButton.current.style.opacity = 'unset';
      deleteButton.current.style.border = 'unset';

      downloadButton.current.disabled = false;
      downloadButton.current.style.color = '#FFFFFF';
      downloadButton.current.style.backgroundColor = '#3890c5';
      downloadButton.current.style.cursor = 'pointer';
      downloadButton.current.style.opacity = 'unset';
      downloadButton.current.style.border = 'unset';
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
            <Link to={`/case/${value}`} className={classes.link}>{value}</Link>
            {' '}
          </div>
        ),
      },
    },
    {
      name: 'study_code',
      label: 'Study Code',
      sortDirection: 'asc',
      options: {
        customBodyRender: (value) => (
          <div className="mui_td" style={tableStyle(2)}>
            {' '}
            <Link to={`/study/${value}`} className={classes.link}>{value}</Link>
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
    onRowsSelect: (curr, allRowsSelected) => onRowsSelect(curr, allRowsSelected),
    customToolbarSelect: (selectedRows, displayData) => {
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

  function divStyle() {
    const css = {
      position: 'absolute',
      marginTop: '-47px',
      marginLeft: '30px',
      display: 'none',
    };
    if (isLoading === false) {
      css.display = 'block';
    }
    return css;
  }

  const btnStyle = {
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

  const dataTable = isLoading ? <SkeletonTable />
    : (
      <MUIDataTable
        data={data}
        columns={columns}
        options={options()}
        className={classes.tableStyle}
      />
    );


function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


  return (
    <Grid container>
     
     <Dialog
          open={modalStatus.open}
          onClose={()=>toggleModal({open:false,selectedFiles:[]})}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              { modalStatus.selectedFiles.length }  File(s) will remove from your cart"
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>toggleModal({open:false})} color="primary">
              Ok
            </Button>
            <Button onClick={()=>toggleModal({open:false,selectedFiles:[]})} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>


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
              ref={downloadButton}
              onClick={downloadJson}
            >
              download manifest
            </button>
            {' '}
            <button
              type="button"
              style={btnStyle}
              ref={deleteButton}
              onClick={removeFiles}
            >
              Remove From Cart
            </button>
          </div>
        </div>
      </Grid>

    </Grid>
  );
};

const styles = (theme) => ({
  link: {
    color: '#DC762F',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

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
  snackBarMessageIcon: {
    verticalAlign: 'middle',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});
export default withStyles(styles, { withTheme: true })(cartView);
