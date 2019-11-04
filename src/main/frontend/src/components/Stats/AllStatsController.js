/* eslint-disable */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StatsView from './StatsView';
import { Typography } from '../Wrappers/Wrappers';
import { fetchDataForStats } from './StatsState';



const Stats = () => {
 let i=1;
 const data = useSelector((state) => {
    if (!state.stats.isFetched) {
    	 console.log(i++);
    	 const dispatch = useDispatch();
      	 dispatch(fetchDataForStats());
    }
    return state.stats.data;
  });

  return (!data || data.length === 0 ? (<Typography variant="headline" color="warning" size="sm">An error has occurred in loading stats component: </Typography>) : <StatsView data={data} />);
};


export default (Stats);
