/* eslint-disable */
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import CaseView from './caseView';
import { Typography } from '../../../components/Wrappers/Wrappers';
import { useSelector,useDispatch } from 'react-redux'


const caseContainer = () => {

// data from store
 const   tableData  =useSelector(function(state){
        return state.dashboard
        	&&state.dashboard.datatable
        		&&state.dashboard.datatable.data
        			?state.dashboard.datatable.data:{};
    } );


  return <CaseView data={tableData} />;
};

export default caseContainer;
