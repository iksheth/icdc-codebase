import React from 'react';
import { useSelector } from 'react-redux';
import StatsView from './StatsView';
import { Typography } from '../Wrappers/Wrappers';

const Stats = () => {
  const data = useSelector((state) => (
    state.dashboard
    && state.dashboard.state
      ? state.dashboard.state : []));

  return (!data || data.length === 0 ? (<Typography variant="headline" color="warning" size="sm">An error has occurred in loading stats component: </Typography>) : <StatsView data={data} />);
};


export default (Stats);
