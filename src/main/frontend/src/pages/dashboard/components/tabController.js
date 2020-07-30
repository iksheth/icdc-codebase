import React from 'react';
import {
  Tabs, Tab, withStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Snackbar from '@material-ui/core/Snackbar';
import {
  CaseData, CaseColumns,
} from './tabConfigs/caseConfig';
import { CaseOnRowsSelect, CaseDisableRowSelection } from '../../../utils/caseFileTable';
import {
  FileData, FileColumns,
} from './tabConfigs/fileConfig';
import { FileOnRowsSelect, FileDisableRowSelection } from '../../../utils/fileTable';
import {
  SampleData, SampleColumns,
} from './tabConfigs/sampleConfig';
import { SampleOnRowsSelect, SampleDisableRowSelection } from '../../../utils/sampleFileTable';
import TabView from './tabView';
import SuccessOutlinedIcon from '../../../utils/SuccessOutlined';
import TabThemeProvider from './tabThemeConfig';
import TabLabel from './tabLabel';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '5px,5px,5px,5px' }}>
      {children}
    </Typography>
  );
}

const tabController = (classes) => {
  // tab settings
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });
  function openSnack(value1) {
    setsnackbarState({ open: true, value: value1 });
  }

  // eslint-disable-next-line no-unused-vars
  function closeSnack() {
    setsnackbarState({ open: false });
  }

  const tabIndex = {
    0: {
      title: 'Case',
      primaryColor: '#F48439',
      secondaryColor: '#FFDFB8',
    },
    1: {
      title: 'Samples',
      primaryColor: '#05C5CC',
      secondaryColor: '#C9F1F1',
    },
    2: {
      title: 'Files',
      primaryColor: '#2446C6',
      secondaryColor: '#E1E5FF',
    },
  };

  function getBorderStyle() {
    const style = '3px solid';
    return `${tabIndex[currentTab].primaryColor} ${style}`;
  }

  function getTabLalbel(title, count) {
    const tabObj = tabIndex[currentTab];
    const primaryColor = (tabObj.title === title) ? tabObj.primaryColor : undefined;
    const secondaryColor = (tabObj.title === title) ? tabObj.secondaryColor : undefined;

    return (
      <TabLabel
        title={title}
        count={count}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    );
  }

  const caseData = CaseData();
  const sampleData = SampleData();
  const fileData = FileData();

  return (
    <>
      <Snackbar
        className={classes.snackBar}
        open={snackbarState.open}
        onClose={closeSnack}
        autoHideDuration={300000}
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
              File(s) successfully added to your cart
            </span>
          </div>
)}
      />
      <TabThemeProvider tableBorder={getBorderStyle()}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label={getTabLalbel('Case', caseData.length)}
          />
          <Tab
            label={getTabLalbel('Samples', sampleData.length)}
          />
          <Tab
            label={getTabLalbel('Files', fileData.length)}
          />
        </Tabs>
        <SwipeableViews
          index={currentTab}
          onChangeIndex={handleTabChange}
          animateTransitions={false}
        >
          <TabContainer>
            <TabView
              data={caseData}
              Columns={CaseColumns}
              customOnRowsSelect={CaseOnRowsSelect}
              openSnack={openSnack}
              closeSnack={closeSnack}
              disableRowSelection={CaseDisableRowSelection}
            />
          </TabContainer>
          <TabContainer>
            <TabView
              data={sampleData}
              Columns={SampleColumns}
              customOnRowsSelect={SampleOnRowsSelect}
              openSnack={openSnack}
              closeSnack={closeSnack}
              disableRowSelection={SampleDisableRowSelection}
            />
          </TabContainer>
          <TabContainer>
            <TabView
              data={fileData}
              Columns={FileColumns}
              customOnRowsSelect={FileOnRowsSelect}
              openSnack={openSnack}
              closeSnack={closeSnack}
              disableRowSelection={FileDisableRowSelection}
            />
          </TabContainer>
        </SwipeableViews>
      </TabThemeProvider>
    </>
  );
};

const styles = () => ({

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
export default withStyles(styles, { withTheme: true })(tabController);
