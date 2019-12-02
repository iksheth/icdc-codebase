import React from 'react';
import { withStyles, Link } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/steeringCommittee.png';
import Body from '../../components/About/BodyView';

const AnalyzingData = ({ classes }) => (
  <>
    <Stats />
    <Header title="Analyzing Data" />

    <Body data={{
      img: l9dg,
      body: (
        <div>
          <p className={classes.title}> From ICDC to Cloud Resources:</p>
Researchers find cases/cohorts in ICDC and then identify the files they would like
to use for analysis. This list of files is called a Manifest. The user will
download the Manifest and then upload the Manifest into
          <Link href="http://www.cancergenomicscloud.org/" color="inherit" className={classes.link}>
            {' '}
            Seven Bridges Genomics
            {''}
          </Link>
 (
SBG) where the files will be available for analysis. The user will need a Seven
Bridges Genomics account. The Manifest file is a text file consisting of CRDC
Identifiers and, on uploading to SBG, the user will be able to access the relevant
 data files and see some basic case information.

          <br />
          <br />
This Cloud Resource analysis model eliminates the need for researchers to download
 and store extremely large data sets by allowing them to bring analysis tools to the
  data in the cloud, instead of the traditional process of bringing the data to the
  tools on local hardware. The Cloud Resources also provide access to on-demand
  computational capacity to analyze these data, allow users to run best practice
  tools and pipelines already implemented, and upload their own data or analysis
  methods to workspaces.

          <br />
          <br />
All three Cloud Resources provide support for data access through a web-based user
 interface in addition to programmatic access to analytic tools and workflows, and
 the capability of sharing results with collaborators. Each Cloud Resource is
 continually developing new functionality to improve the user experience and add new
 tools for researchers.

          <br />
          <br />
Currently the ICDC supports analysis via the Seven Bridges Genomics Cloud Resource.
          {' '}
          {' '}
          <br />
          <br />

          <br />
          <br />
          <p className={classes.title}>Seven Bridges Cancer Genomics Cloud:</p>
          <br />
The
          <Link href="http://www.cancergenomicscloud.org/" color="inherit" className={classes.link}>
            {' '}
            Seven Bridges Cancer Genomics Cloud
            {' '}
          </Link>
, hosted on Amazon Web Services, has a rich
user interface that allows researchers to find data of interest and combine it with
 their own private data. Data can be analyzed using more than 200 preinstalled,
 curated bioinformatics tools and workflows. Researchers can also extend the
 functionality of the platform by adding their own data and tools via an intuitive
  software development kit.

          <br />
          <br />
          <p className={classes.title}>Institute for Systems Biology ISB Cloud:</p>
          <br />
The
          <Link href="https://isb-cgc.appspot.com/" color="inherit" className={classes.link}>
            {' '}
            ISB Cancer Genomics Cloud
          </Link>
            , leveraging many aspects of the Google Cloud Platform,
 allows scientists to interactively define and compare cohorts, examine underlying
 molecular data for specific genes and pathways, and share insights with
 collaborators. For computational users, Application Program Interfaces (APIs) and
 Google Cloud Platform (GCP) resources such as BigQuery and Google Pipeline service,
 allow complex queries from R or Python scripts, or Dockerized workflows to run on
 data available in the Google Cloud Storage.

          <br />
          <br />
          <p className={classes.title}>Broad Institute FireCloud:</p>
          <br />
          <Link href="https://software.broadinstitute.org/firecloud/" color="inherit" className={classes.link}>
            {' '}
 FireCloud
            {' '}
          </Link>

  is an open, standards-based platform for performing production-scale data
 analysis in the cloud. Built on the Google Cloud Platform, FireCloud empowers
 analysts, tool developers, and production managers to run large-scale analysis and
  to share results with collaborators. Users can upload their own analysis methods
  and data to workspaces or run the Broad’s best practice tools and pipelines.

          <br />
          <br />
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


export default withStyles(styles, { withTheme: true })(AnalyzingData);
