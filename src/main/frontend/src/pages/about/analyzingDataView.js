/* eslint-disable */
import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/analying.png';
import Body from '../../components/About/BodyView'; 
const AnalyzingData = ({ classes }) => {
  return (
    <>
      <Stats />
       <Header title="Analyzing Data"/>
      <div className={classes.container}>
        <Body data={{
          img:l9dg,
          body:(<div><b>From ICDC to Cloud Resources:</b><br/><br/>
Researchers find cases/cohorts in ICDC and then identify the files they would like to use for analysis. This list of files is called a Manifest. The user will download the Manifest and then upload the Manifest into Seven Bridges Genomics (SBG) where the files will be available for analysis. The user will need a Seven Bridges Genomics account. The Manifest file is a text file consisting of CRDC Identifiers and, on uploading to SBG, the user will be able to access the relevant data files and see some basic case information.<br/><br/>
This Cloud Resource analysis model eliminates the need for researchers to download and store extremely large data sets by allowing them to bring analysis tools to the data in the cloud, instead of the traditional process of bringing the data to the tools on local hardware. The Cloud Resources also provide access to on-demand computational capacity to analyze these data, allow users to run best practice tools and pipelines already implemented, and upload their own data or analysis methods to workspaces.<br/><br/>
All three Cloud Resources provide support for data access through a web-based user interface in addition to programmatic access to analytic tools and workflows, and the capability of sharing results with collaborators. Each Cloud Resource is continually developing new functionality to improve the user experience and add new tools for researchers.<br/><br/>
Currently the ICDC supports analysis via the Seven Bridges Genomics Cloud Resource. <br/><br/>

<br/><br/><b>Seven Bridges Cancer Genomics Cloud</b><br/><br/>
The Seven Bridges Cancer Genomics Cloud, hosted on Amazon Web Services, has a rich user interface that allows researchers to find data of interest and combine it with their own private data. Data can be analyzed using more than 200 preinstalled, curated bioinformatics tools and workflows. Researchers can also extend the functionality of the platform by adding their own data and tools via an intuitive software development kit.<br/><br/>
<b>Institute for Systems Biology ISB Cloud</b><br/><br/>
The ISB Cancer Genomics Cloud, leveraging many aspects of the Google Cloud Platform, allows scientists to interactively define and compare cohorts, examine underlying molecular data for specific genes and pathways, and share insights with collaborators. For computational users, Application Program Interfaces (APIs) and Google Cloud Platform (GCP) resources such as BigQuery and Google Pipeline service, allow complex queries from R or Python scripts, or Dockerized workflows to run on data available in the Google Cloud Storage.<br/><br/>
<b>Broad Institute FireCloud</b><br/><br/>
FireCloud is an open, standards-based platform for performing production-scale data analysis in the cloud. Built on the Google Cloud Platform, FireCloud empowers analysts, tool developers, and production managers to run large-scale analysis and to share results with collaborators. Users can upload their own analysis methods and data to workspaces or run the Broad’s best practice tools and pipelines.<br/><br/>

</div>),
        }}
        />
      </div>
    </>
  );
};

const styles = () => ({
  
  container: {
    margin: '16px auto',
    maxWidth: '1400px',
    minHeight:'800px',
    margin:'auto 30px',
  },
});



export default withStyles(styles, { withTheme: true })(AnalyzingData);
