import React from 'react';
import { withStyles } from '@material-ui/core';
import SteeringCommitteeTable from './steeringCommitteeTable';
import { Typography } from '../../components/Wrappers/Wrappers';

const SteeringCommittee = ({ classes }) => (
  <div className={classes.pageContainer}>
    <div className={classes.titleContainer}>
      <div className={classes.pageTitle}>Steering Committee</div>
    </div>
    <Typography>
      <p className={classes.paragraphStyle}>
          Among the important NCI principles related to data commons is
          "community-driven", meaning that the data commons will be built with
          input and collaboration from many groups to foster a diversity of
          ideas and to ensure needs are identified across the broad research
          community. To achieve this, the NCI/FNLCR formed a Steering Committee
          (SC) to advise on the Integrated Canine Data Commons (ICDC). The
          initial work by the Steering Committee is to discuss the data for the
          ICDC and identify use cases for working with the data in the ICDC. The
          Steering Committee plays an important role in sourcing data for
          incorporation in the ICDC and in early use and feedback of the ICDC
          focusing on the gathered use cases.
        {' '}
      </p>
      {' '}
    </Typography>
    <Typography>
      <p className={classes.paragraphStyle}>
          The SC has two subcommittees: the Data Governance Advisory Board
          (DGAB) and the Best Practices Sub-Committee (BPSC).
      </p>
      {' '}
    </Typography>
    <Typography>
      <p className={classes.paragraphStyle}>
          The DGAB is charged with managing the data submission requests (link
          to data submission page) to the ICDC during the prototype phase of the
          project. It has developed a process by which the community can request
          their project be added to the ICDC. All requests are tracked,
          reviewed, and prioritized by the DGAB. The prioritized list is
          provided to a Senior Advisory Committee at NCI, which determines which
          data will be included in ICDC. Decisions are tracked and communicated
          to all relevant stakeholders, in a timely manner.
      </p>
      {' '}
    </Typography>
    <Typography>
      <p className={classes.paragraphStyle}>
          The Best Practices Subcommittee (BPSC) has responsibility for
          identifying and recommending best practices that the ICDC will
          implement to streamline and harmonize data collection, standardize
          data formats and platforms, and manage and annotate data (especially
          clinical data). The ICDC prototype will encompass imagin,
          clinical/pathologic, multi-omic, and immunologic data. The overall
          goal of the BPSC will be to streamline and standardize data collection
          and management for canine studies. The BPSC will examine past and
          planned studies and will recommend prospective standards for data
          collection and management.
        {' '}
      </p>
      {' '}
    </Typography>
    <Typography>
      <p className={classes.paragraphStyle}>
        <SteeringCommitteeTable />
      </p>
      {' '}
    </Typography>
  </div>
);

const styles = () => ({
  pageContainer: {
    margin: '0 auto',
    padding: '0px 16px',
    maxWidth: '1440px',
    minHeight: '160px',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  titleContainer: {
    marginBottom: '16px',
    textAlign: 'center',
    width: '100%',
  },
  pageTitle: {
    color: '#142A4E',
    fontSize: '2.8125rem',
    fontWeight: '400',
  },
  paragraphStyle: {
    margin: '16px auto',
    maxWidth: '900px',
  },
});

export default withStyles(styles, { withTheme: true })(SteeringCommittee);
