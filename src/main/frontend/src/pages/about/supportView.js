import React from 'react';
import { withStyles } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/steeringCommittee.png';
import Body from '../../components/About/BodyView';

const SupportView = ({ classes }) => (
  <>
    <Stats />
    <Header title="Support" />
    <div className={classes.container}>
      <Body data={{
        img: l9dg,
        body: (
          <div>
            {' '}
If you have any questions,
        please contact us at ICDCHelpDesk@mail.nih.gov.
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


export default withStyles(styles, { withTheme: true })(SupportView);
