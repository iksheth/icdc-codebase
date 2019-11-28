/* eslint-disable */
import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/purpose.png';
import Body from '../../components/About/BodyView'; 
const PurposeView = ({ classes }) => {
  return (
    <>
      <Stats />
       <Header title="Purpose"/>
      <div className={classes.container}>
        <Body data={{
          img:l9dg,
          body:(<div> NCI’s Division of Cancer Treatment and Diagnosis (DCTD) contracted the Frederick National Laboratory for Cancer Research (FNLCR) to build the Integrated Canine Data Commons (ICDC), a cloud-based repository of canine cancer data and was established to further research on human cancers by enabling comparative analysis with canine cancer.  The data in the ICDC is sourced from multiple different programs and projects; all focused on canine subjects. The data is harmonized into an integrated data model and then made available to the research community. The ICDC is part of the Cancer Research Data Commons (CRDC), an initiative from NCI’s Center for Biomedical Informatics and Information Technology (CBIIT). Bioinformatic analysis of the ICDC data is accomplished using the CRDC’s Cloud Resources.
<br/><br/>
Within the FNLCR, the Biomedical Informatics and Data Science (BIDS) Directorate is focused on software engineering and data handling.  The Applied and Developmental Research Directorate (ADRD) is managing the ICDC Steering Committee and providing one of the data sources for the ICDC. Finally, there is also an ICDC Steering Committee (composed of external members, FNLCR and NCI staff) that provides advice to DCTD on the ICDC.  

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


export default withStyles(styles, { withTheme: true })(PurposeView);
