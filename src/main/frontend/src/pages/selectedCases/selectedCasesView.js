import React, { useEffect } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MUIDataTable from 'mui-custom-datatables';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import icon from '../../assets/icons/Icon-MyCases.svg';
import wizardIcon from '../../assets/icons/Wizard.Step2-MyCases.svg';
import CustomFooter from './customFooter';
import { deleteCasesAction, deleteCasesWithRecordAction } from './selectedCasesState';
import SuccessOutlinedIcon from '../../utils/SuccessOutlined';
import Warning from './warningView';


const tableStyle = (ratio = 1) => ({
  width: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  overflow: 'hidden',
  wordBreak: 'break-word',
  maxWidth: (((document.documentElement.clientWidth * 0.6) / 10) * ratio),
  minWidth: '10px',
}
);

const columns = (classes) => [

  {
    name: 'case_id',
    label: 'Case ID',
    sortDirection: 'asc',
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div style={tableStyle(1.5)}>
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
    options: {
      filter: false,
      sortDirection: 'asc',
      customBodyRender: (value) => (
        <div style={tableStyle(1.3)}>
          {' '}
          <Link to={`/study/${value}`} className={classes.link}>{value}</Link>
          {' '}
        </div>
      ),
    },
  },
  {
    name: 'study_type',
    label: 'Study Type',
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
    name: 'breed',
    label: 'Breed',
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
    name: 'diagnosis',
    label: 'Diagnosis',
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
    name: 'stage_of_disease',
    label: 'Stage of Disease',
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
    name: 'age',
    label: 'Age',
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
    name: 'sex',
    label: 'Sex',
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
    name: 'neutered_status',
    label: 'Neutered Status',
    options: {
      customBodyRender: (value) => (
        <div className="mui_td" style={tableStyle(1.6)}>
          {' '}
          {value}
          {' '}
        </div>
      ),
    },
  },
];


const SelectedCasesView = ({ dataInCart, data, classes }) => {
  const dispatch = useDispatch();


  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
    rowsDeleted: null,
    cases: null,
  });
  function openSnackBar(value, rowsDeleted, cases) {
    setsnackbarState({
      open: true, value, rowsDeleted, cases,
    });
  }
  function closeSnackBar() {
    setsnackbarState({ open: false });
    if (snackbarState.rowsDeleted
        && snackbarState.rowsDeleted !== null
        && snackbarState.rowsDeleted.data
          && snackbarState.cases
            && snackbarState.cases !== null) {
      dispatch(deleteCasesAction(
        snackbarState.rowsDeleted.data.map((row) => snackbarState.cases[row.dataIndex].case_id),
      ));
    }
  }

  useEffect(() => {
    const caseIdDB = data.map((d) => d.case_id);
    const caseIds = dataInCart.cases.filter((id) => !caseIdDB.includes(id));
    if (caseIds.length > 0) {
      dispatch(deleteCasesWithRecordAction(caseIds));
      const timer = setTimeout(() => dispatch(deleteCasesWithRecordAction([])), 8000);
      return () => clearTimeout(timer);
    }
    return () => null;
  }, []);


  const options = (cases) => ({
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
      if (rowsDeleted.data.length > 0) {
        openSnackBar(rowsDeleted.data.length, rowsDeleted, cases);
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


  return (
    <>
      <Grid>
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
                  <span>My Cases: Cases</span>
                </span>
              </div>
            </div>
            <div className={classes.tableTitleWizard}>
              <img
                src={wizardIcon}
                alt="ICDC MyCases Wizard"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          {dataInCart.deletedCases.length > 0 ? <Warning ids={dataInCart.deletedCases} /> : ''}
        </Grid>
        <Grid item xs={12}>
          <div className={classes.tableWrapper} id="table_selected_cases">
            <MUIDataTable
              data={data}
              columns={columns(classes)}
              options={options(data)}
              className={classes.tableStyle}
            />
          </div>
        </Grid>
      </Grid>
      <Snackbar
        className={classes.snackBar}
        open={snackbarState.open}
        onClose={closeSnackBar}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={(
          <div className={classes.snackBarMessage}>
            <span>
              <SuccessOutlinedIcon />
              {' '}
            </span>
            <span className={classes.snackBarText}>
              {snackbarState.value}
              {' '}
              Case(s) successfully removed from the My Cases list
            </span>
          </div>
)}
      />
    </>
  );
};


const styles = (theme) => ({
  button: {
    textDecoration: 'none',
  },
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
    margin: '30px auto 30px auto',
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
    verticalAlign: 'bottom',
  },
  snackBarMessage: {
    display: 'flex',
  },
  snackBarText: {
    paddingLeft: '10px',
  },
});


export default withStyles(styles, { withTheme: true })(SelectedCasesView);
