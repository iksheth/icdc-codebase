/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import {
  Grid,
  withStyles,
  Chip,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from 'react-router-dom';
import SuccessOutlinedIcon from '../../../utils/SuccessOutlined';
import CustomFooter from './customFooter';
import { toggleCheckBox } from '../dashboardState';
import { receiveFiles } from '../../cart/cartState';
import {Configuration,DefaultColumns} from './config.js'

const tableStyle = (ratio = 1) => ({
  width: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  overflow: 'hidden',
  wordBreak: 'break-word',
  maxWidth: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  minWidth: '160px',
}
);

const Files = ({ classes, data }) => {
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

 function columnBuilder(data){
  if(data.length == 0){
    return DefaultColumns;
  }else{
    let columns = [];
    for(const attr of Object.keys(data[0])){
      const hasAttrInConfig =Configuration.hasOwnProperty(attr);
      if(hasAttrInConfig){  // within configuration
        if(Configuration[attr]["display"]){ // config as not to display
           if(Configuration[attr]["isKey"]){
              // get file ids at first column and then hide it. 
               columns[0]={
                name: attr,
                label: hasAttrInConfig?Configuration[attr]["label"]:attr,
                options: {
                  filter: false,
                  sortDirection: 'asc',
                  display: false,
                },
              }
           }
            if(Configuration[attr]["index"]){
               columns[Configuration[attr]["index"]]={
                  name: attr,
                  label: hasAttrInConfig?Configuration[attr]["label"]:attr,
                  options: {
                    filter: false,
                    sortDirection: 'asc',
                  },
                };
            }
                
       }
      }
    }
    return columns;
  }
    
 }
 const columns = columnBuilder(data);

  const dispatch = useDispatch();
  // data from store
  const chipData = useSelector((state) => (
    state.dashboard.datatable
    && state.dashboard.datatable.filters
      ? state.dashboard.datatable.filters : []));

  const cart = useSelector((state) => (
    state.cart ? state.cart : []));
  // Get the existing caseIds from MyCases cart state
  const fileIDs = useSelector((state) => state.cart.fileIDs);


  // The bubble below will shows in the dashboard and work as
  // When user select and filters
  // they will float above the case table on the dashboard .
  // Due to the design issue, disable bubble function for now

  let bubbles = (chipData.map((ckdata) => (
    <Chip
      key={ckdata.datafield + ckdata.name}
      label={ckdata.name}
      onDelete={() => {
        dispatch(toggleCheckBox([{
          groupName: ckdata.groupName,
          name: ckdata.name,
          datafield: ckdata.datafield,
          isChecked: false,
        }]));
      }}
      classes={{
        root: classes.chipRoot,
        deleteIcon: classes.chipDeleteIcon,
      }}
    />
  )));

  bubbles = '';


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


  let selectedIds = [];

  function exportCases() {
    // Find the newly added cases by comparing
    // existing caseIds and selectedIds
    const uniqueIDs = fileIDs !== null ? selectedIds.filter(
      (e) => !fileIDs.find((a) => e === a),
    ).length : selectedIds.length;
    if (uniqueIDs > 0) {
      openSnack(uniqueIDs);
    }
    dispatch(receiveFiles(uniqueIDs));
    selectedIds = [];
  }


  function onRowsSelect(curr, allRowsSelected) {
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


 


  const options = () => ({
    selectableRows: true,
    search: false,
    filter: false,
    searchable: false,
    print: false,
    download: false,
    viewColumns: false,
    pagination: true,
    isRowSelectable: (dataIndex) => {
      // if (cart.cases.includes(data[dataIndex].case_id)) {
      //   // disable the grey out functionality , change the return to false will bring it back
      //   return true;
      // }
       return true;
    },
    onRowsSelect: (curr, allRowsSelected) => onRowsSelect(curr, allRowsSelected),
    customToolbarSelect: (selectedRows, displayData) => {
      const selectedKeys = Object.keys(selectedRows.data).map((keyVlaue) => (
        selectedRows.data[keyVlaue].index
      ));
      const selectedId = selectedKeys.map((keyVlaue) => (
        displayData[keyVlaue].data[0]
      ));
      selectedIds = selectedId;
      return '';
    },
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
      <CustomFooter
        text="SAVE TO MY FILES"
        onClick={() => exportCases(dispatch)}
        classes={classes}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
      // eslint-disable-next-line no-shadow
        onChangePage={(_, page) => changePage(page)}
      />
    ),

  });

  return (
    <>
      <Snackbar
        className={classes.snackBar}
        open={snackbarState.open}
        onClose={closeSnack}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={(
          <div className={classes.snackBarMessage}>
            <span className={classes.snackBarMessageIcon}>
              <SuccessOutlinedIcon />
              {' '}
            </span>
            <span className={classes.snackBarText}>
              {snackbarState.value}
              {' '}
              Case(s) successfully added to the My Cases list
            </span>
          </div>
)}
      />
      <div>
        <div className={classes.chips}>
          {bubbles}
        </div>

        <Grid container>
          <Grid item xs={12} id="table_cases">
            <MUIDataTable
              data={data}
              columns={columns}
              options={options()}
            />
          </Grid>

        </Grid>
        <Grid item xs={12} className={classes.saveButtonDiv}>
          <button
            type="button"
            ref={saveButton}
            onClick={exportCases}
            className={classes.button}
          >
            ADD FILES TO MY CART
          </button>
        </Grid>
      </div>
    </>
  );
};


const styles = () => ({

  link: {
    color: '#DC762F',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  caseTitle: {
    color: '#194563',
    fontSize: '25.2pt',
    fontStyle: 'normal',
    fontFamily: 'Raleway',
    letterSpacing: '0.025em',
    backgroundColor: '#f5f5f5',
    padding: '10px 32px 8px 28px',
  },
  chips: {
    position: 'absolute',
    marginLeft: '250px',
    marginTop: '36px',
    zIndex: '999',
  },
  chipRoot: {
    color: '#ffffff',
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '0.075em',
    marginLeft: '10px',
    backgroundColor: '#9b9b9b',
    fontSize: '9pt',
  },
  chipDeleteIcon: {
    color: '#ffffff',
    '&:hover': {
      color: '#ffffff',
    },
  },
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
  },
  saveButtonDiv: {
    position: 'absolute',
    margin: '-50px 0 0 0',
    paddingLeft: '25px',
  },
  button: {
    borderRadius: '10px',
    width: '178px',
    height: '27px',
    lineHeight: '18px',
    fontSize: '10pt',
    color: '#fff',
    backgroundColor: '#ff7f15',
  },
  snackBarMessageIcon: {
    verticalAlign: 'middle',
  },
});

export default withStyles(styles, { withTheme: true })(Files);
