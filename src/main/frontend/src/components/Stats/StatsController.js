import React from 'react';
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Query } from 'react-apollo';
import StatsView from './StatsView';
import { Typography } from '../Wrappers/Wrappers';

const GET_STATS = gql`{
  numberOfStudies
  numberOfCases
  numberOfSamples
  numberOfFiles
  numberOfAliquots
  }
  `;

const Stats = () => (
  <Query query={GET_STATS}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress /> : (error ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography> : <StatsView data={data} />)
    )}
  </Query>
);


export default (Stats);
