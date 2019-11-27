/* eslint-disable */
import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/support.png';
import Body from '../../components/About/BodyView'; 
const SupportView = ({ classes }) => {
  return (
    <>
      <Stats />
       <Header title="Support"/>
      <div className={classes.container}>
        <Body data={{
          img:l9dg,
          body:(<div> If you have any questions, please contact us at ICDCHelpDesk@mail.nih.gov.
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



export default withStyles(styles, { withTheme: true })(SupportView);
