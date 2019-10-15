/* eslint-disable */
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import CaseView from './caseView';
import { Typography } from '../../../components/Wrappers/Wrappers';
import { useSelector } from 'react-redux'




const caseContainer = () => {
  

// data from store
 const { data, filters }  =useSelector(function(state){
        return state.dashboard&&state.dashboard.datatable&&state.dashboard.datatable.data?{ data : state.dashboard.datatable.data, filters :state.dashboard.datatable.filters }:{data:{},filters:{}};
    } );


  return <CaseView data={data} filters={filters} />;
};

export default caseContainer;
