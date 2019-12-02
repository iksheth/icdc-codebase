import React from 'react';
import { withStyles, Link } from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import Header from '../../components/About/HeaderView';
import l9dg from '../../assets/about/steeringCommittee.png';
import Body from '../../components/About/BodyView';

const Developers = ({ classes }) => (
  <>
    <Stats />
    <Header title="Developers" />
    <Body data={{
      img: l9dg,
      body: (
        <div>
          {' '}
The ICDC System is architected to provide data both on a web front end as well as
via two API’s:
          <Link href="/" color="inherit" className={classes.link}>
            {' '}
GraphQL
            {' '}
          </Link>
            and
          <Link href="/" color="inherit" className={classes.link}>
            {' '}
            {' '}
REST
            {' '}
          </Link>
          <br />
          <br />
Access is read-only as the system is immutable.  At this point, users do not
require authentication to the system as the data is public.   Our GitHub repository
eatures backend documentation about how to access the system, including endpoints
 and recommendations for tools and example queries.
          <br />
          <br />
          <br />
          <hr />
          <br />
          <br />
          <p className={classes.title}> GitHub:</p>
ICDC is based on a Graph database, and features a GraphQL API (Java), a REST API
(Java) and a React front-end (JavaScript). We have provided all our code on our
          <Link href="https://github.com/CBIIT/icdc-codebase" color="inherit" className={classes.link}>
            {' '}
            ICDC GitHub Repository
            {' '}
          </Link>
and encourage others to use and improve it.
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


export default withStyles(styles, { withTheme: true })(Developers);
