import React from 'react';
import {
  Tabs, Tab,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import CaseData from './caseTable/caseController';
import FileData from './fileTable/fileController';
import SampleData from './sampleTable/sampleController';
import CaseView from './caseTable/caseView';
import FileView from './fileTable/fileView';
import SampleView from './sampleTable/sampleView';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '5px,5px,5px,5px' }}>
      {children}
    </Typography>
  );
}

const tabController = () => {
  // tab settings
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  const caseData = CaseData();
  const sampleData = SampleData();
  const fileData = FileData();
  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label={`Case(${caseData.length})`} />
        <Tab label={`Samples(${sampleData.length})`} />
        <Tab label={`Files(${fileData.length})`} />
      </Tabs>
      <SwipeableViews
        index={currentTab}
        onChangeIndex={handleTabChange}
        animateTransitions={false}
      >
        <TabContainer><CaseView data={caseData} /></TabContainer>
        <TabContainer><SampleView data={sampleData} /></TabContainer>
        <TabContainer><FileView data={fileData} /></TabContainer>
      </SwipeableViews>
    </>
  );
};

export default tabController;
