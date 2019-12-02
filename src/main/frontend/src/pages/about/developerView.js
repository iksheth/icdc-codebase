import React from 'react';
import { withStyles } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/steeringCommittee.png';
import Body from '../../components/About/BodyView';

const Developers = ({ classes }) => (
  <>
    <Stats />
    <Header title="Developers" />
    <div className={classes.container}>
      <Body data={{
        img: l9dg,
        body: (
          <div>
            {' '}
The ICDC System is architected to provide data both on a web front end as well as
via two API’s:  GraphQL and and REST:
            <br />
            <br />

            <br />
            <br />
http://DOMAIN/v1/graphql/
            <br />
            <br />
http://DOMAIN/v1/REST
            <br />
            <br />

            <br />
            <br />
Access is read-only as the system is immutable.  At this point, users do not
require authentication to the system as the data is public.   Our GitHub repository
eatures backend documentation about how to access the system, including endpoints
 and recommendations for tools and example queries.
            <br />
            <br />
GitHub:
            <br />
            <br />
ICDC is based on a Graph database, and features a GraphQL API (Java), a REST API
(Java) and a React front-end (JavaScript). We have provided all our code on our
ICDC GitHub Repository and encourage others to use and improve it.
            <br />
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


export default withStyles(styles, { withTheme: true })(Developers);
