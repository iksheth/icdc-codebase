import React from 'react';
import {
  Tabs, Tab,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { CaseData, CaseColumns, CaseOnRowsSelect } from './tabConfigs/caseConfig';
import { FileData, FileColumns, FileOnRowsSelect } from './tabConfigs/fileConfig';
import { SampleData, SampleColumns, SampleOnRowsSelect } from './tabConfigs/sampleConfig';
import TabView from './tabView';

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
        <Tab label={`Case  (${caseData.length})`} />
        <Tab label={`Samples  (${sampleData.length})`} />
        <Tab label={`Files  (${fileData.length})`} />
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
          />
        </TabContainer>
        <TabContainer>
          <TabView
            data={sampleData}
            Columns={SampleColumns}
            customOnRowsSelect={SampleOnRowsSelect}
          />
        </TabContainer>
        <TabContainer>
          <TabView
            data={fileData}
            Columns={FileColumns}
            customOnRowsSelect={FileOnRowsSelect}
          />
        </TabContainer>
      </SwipeableViews>
    </>
  );
};

export default tabController;
