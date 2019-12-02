import React from 'react';
import { withStyles, Link } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/steeringCommittee.png';
import Body from '../../components/About/BodyView';

const CRDC = ({ classes }) => (
  <>
    <Stats />
    <Header title="Cancer Research Data Commons(CRDC)" />
    <Body data={{
      img: l9dg,
      body: (
        <div>
          {' '}
The Cancer Research Data Commons
is an initiative from NCI’s
          <Link href="https://datascience.cancer.gov/" color="inherit" className={classes.link}>
            {' '}
            {' '}
CBIIT
            {' '}
          </Link>
    .
    https://datascience.cancer.gov/data-commons
The vision for the
          <Link href="https://datascience.cancer.gov/data-commons" color="inherit" className={classes.link}>
            {' '}
Cancer Research Data
Commons
          </Link>
 (CRDC) is a virtual, expandable
infrastructure that provides secure access
to many different data types across scientific
domains, allowing users to analyze, share, and
store results, leveraging the storage and elastic
 compute, or ability to easily scale resources, of
 the cloud. The ability to combine diverse data types
 and perform cross-domain analysis of large data sets
 can lead to new discoveries in cancer prevention, treatment
 and diagnosis, and supports the goals of precision medicine and
  the Cancer Moonshot℠.
          <br />
          <br />
The CRDC has three
          <Link href="https://datascience.cancer.gov/data-commons/cloud-resources" color="inherit" className={classes.link}>
            {' '}
Cloud Resources
          </Link>
          {' '}
options (Seven Bridges Genomics, the Broad,
 and the Institute for Systems Biology), each providing analysis platforms for
the community to use when working with Data Commons data. Initially, the ICDC
works with the Seven Bridge Genomics Cloud Resource.
          <br />
          <br />
These cloud-based platforms eliminate the need for researchers to download and
store extremely large data sets by allowing them to bring analysis tools to the
 data in the cloud, instead of the traditional process of bringing the data to
 the tools on local hardware. The Cloud Resources also provide access to on-demand
  computational capacity to analyze these data. The Cloud Resources allow users to
  run best practice tools and pipelines already implemented or upload their own
  data or analysis methods to workspaces.
          <br />
          <br />
All three Cloud Resources provide support for data access through a web-based
user interface in addition to programmatic access to analytic tools and workflows,
 and the capability of sharing results with collaborators. Each Cloud Resource is
 continually developing new functionality to improve the user experience and add
 new tools for researchers.
          <br />
          <br />
More details can be found here (
          <Link href="https://datascience.cancer.gov/data-commons" color="inherit" className={classes.link}>
            {' '}
https://datascience.cancer.gov/data-commons
            {''}
          </Link>
).
        </div>),
    }}
    />
  </>
);

const styles = () => ({
  link: {
    color: '#0296C9',
    fontWeight: 'bolder',
    '&:hover': {
      color: '#0296C9',
      fontWeight: 'bolder',
      textDecoration: 'none',
    },
  },
  title: {
    color: '#0B3556',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});


export default withStyles(styles, { withTheme: true })(CRDC);
