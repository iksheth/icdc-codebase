import React, { useRef, useEffect } from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import Snackbar from '@material-ui/core/Snackbar';
import SuccessOutlinedIcon from '../../../utils/SuccessOutlined';
import CustomFooter from './tabFooter';
import { addFiles } from '../../cart/store/cartAction';

const TabView = ({
  classes, data, Columns, customOnRowsSelect,
}) => {
  const [snackbarState, setsnackbarState] = React.useState({
    open: true,
    value: 0,
  });
  function openSnack(value1) {
    setsnackbarState({ open: true, value: value1 });
  }
  function closeSnack() {
    setsnackbarState({ open: false });
  }

  const dispatch = useDispatch();
  // Get the existing files ids from  cart state
  const fileIDs = useSelector((state) => state.cart.files);

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

  let selectedFileIDs = [];

  function exportFiles() {
    // Find the newly added files by comparing
    const newFileIDS = fileIDs !== null ? selectedFileIDs.filter(
      (e) => !fileIDs.find((a) => e === a),
    ).length : selectedFileIDs.length;
    openSnack(newFileIDS);
    dispatch(addFiles({ files: selectedFileIDs }));
    selectedFileIDs = [];
  }

  function onRowsSelect(curr, allRowsSelected) {
    selectedFileIDs = [...new Set(selectedFileIDs.concat(
      customOnRowsSelect(data, allRowsSelected),
    ))];

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

  const columns = Columns(classes);

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
    // eslint-disable-next-line no-unused-vars
    customToolbarSelect: () => '',
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
      <CustomFooter
        text="SAVE TO MY CASES"
        onClick={() => exportFiles(dispatch)}
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
        autoHideDuration={30000}
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
              File(s) successfully added to the My Cart
            </span>
          </div>
)}
      />
      <div>

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
            onClick={exportFiles}
            className={classes.button}
          >
            ADD ASSOCIATED FILES TO MY CART
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
    width: '330px',
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

export default withStyles(styles, { withTheme: true })(TabView);
