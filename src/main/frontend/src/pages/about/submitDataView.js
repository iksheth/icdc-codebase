import React from 'react';
import { withStyles } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/steeringCommittee.png';
import Body from '../../components/About/BodyView';

const SubmitingData = ({ classes }) => (
  <>
    <Stats />
    <Header title="Submitting Data" />
    <div className={classes.container}>
      <Body data={{
        img: l9dg,
        body: (
          <div>
Harmonization/Integration:
            <br />
The ICDC functions best for the research community when the data is integrated.
Once a project is accepted into the ICDC, the ICDC data team will work with the
 submitter to review the data looking at data structure, data values, data quality
  as well as identifying any standards that were utilized. Based on that review,
  a plan for how to submit the data will be agreed upon between ICDC and the
  submitter.
            {' '}
            <br />
Data Model:
            <br />
The ICDC data model is a representation of how all the constituent data are
arranged relative to each other. The current data model is available for viewing
on CBIIT’s Github repository (https://cbiit.github.io/icdc-model-tool/). Given the
 number of studies, the range of study types and the multiple data types that the
 ICDC needs to support, the data model will need to adapt to the needs of the
 science. The data model is not static and is expected to change as new needs
 are identified.
            {' '}
            <br />
FAIR and citing:
            <br />
The ICDC will adhere to FAIR principles of data stewardship: Findable, Accessible,
Interoperable, and Reusable.
            <br />
Please credit the ICDC in your manuscript. When citing individual projects,
please refer to the attribution policies of the project when available.
            <br />
License:
            <br />
Data made available through the ICDC is for research purposes only.
The ICDC provides researchers with access to data from canine cancer studies
to enable exploratory analysis that cannot be considered definitive for outcomes.
            <br />
All data is publicly available.
            <br />
          </div>),
      }}
      />
    </div>
  </>
);

const styles = () => ({

  container: {
    maxWidth: '1400px',
    minHeight: '800px',
    margin: '16px 30px',
  },
});


export default withStyles(styles, { withTheme: true })(SubmitingData);
