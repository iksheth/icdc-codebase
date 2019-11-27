/* eslint-disable */
import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/crdc.png';
import Body from '../../components/About/BodyView'; 
const CRDC = ({ classes }) => {
  return (
    <>
      <Stats />
       <Header title="Cancer Research Data Commons(CRDC)"/>
      <div className={classes.container}>
        <Body data={{
          img:l9dg,
          body:(<div> The Cancer Research Data Commons is an initiative from NCI’s CBIIT. The vision for the Cancer Research Data Commons (CRDC) is a virtual, expandable infrastructure that provides secure access to many different data types across scientific domains, allowing users to analyze, share, and store results, leveraging the storage and elastic compute, or ability to easily scale resources, of the cloud. The ability to combine diverse data types and perform cross-domain analysis of large data sets can lead to new discoveries in cancer prevention, treatment and diagnosis, and supports the goals of precision medicine and the Cancer Moonshot℠. 
<br/>
<br/>
The CRDC has three Cloud Resources options (Seven Bridges Genomics, the Broad, and the Institute for Systems Biology), each providing analysis platforms for the community to use when working with Data Commons data. Initially, the ICDC works with the Seven Bridge Genomics Cloud Resource.
<br/>
<br/>
These cloud-based platforms eliminate the need for researchers to download and store extremely large data sets by allowing them to bring analysis tools to the data in the cloud, instead of the traditional process of bringing the data to the tools on local hardware. The Cloud Resources also provide access to on-demand computational capacity to analyze these data. The Cloud Resources allow users to run best practice tools and pipelines already implemented or upload their own data or analysis methods to workspaces.
<br/>
<br/>
All three Cloud Resources provide support for data access through a web-based user interface in addition to programmatic access to analytic tools and workflows, and the capability of sharing results with collaborators. Each Cloud Resource is continually developing new functionality to improve the user experience and add new tools for researchers.
<br/>
<br/>
More details can be found here (https://datascience.cancer.gov/data-commons).

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
  },
});



export default withStyles(styles, { withTheme: true })(CRDC);
