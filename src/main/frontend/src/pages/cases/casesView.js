import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import StatsView from '../../components/Stats/StatsView';
import CaseView from '../dashboard/caseTable/caseView';

const CasesView = ({ classes, data }) => {
  const stat = {
    numberOfStudies: 1,
    numberOfCases: data.caseCountOfStudy,
    numberOfSamples: data.sampleCountOfStudy,
    numberOfFiles: data.fileCountOfStudy,
    numberOfBiospecimenAliquots: data.aliguotCountOfStudy,
  };
  return (
    <>
      <StatsView data={stat} />
      {/* Start of case view conatiner */}
      <div className={classes.caseCardContainer}>
        <CaseView data={data.caseOverview} />
      </div>
    </>
  );
};

const styles = (theme) => ({
  caseCardContainer: {
    marginTop: '32px',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
});

export default withStyles(styles, { withTheme: true })(CasesView);
