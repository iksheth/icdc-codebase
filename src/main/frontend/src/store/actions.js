/*eslint-disable */
import {
        DASHBOARD_QUERY_ERR,
        TOGGLE_SIDEBAR,
        RECEIVE_DASHBOARD,
        TOGGLE_CHECKBOX,
        UPDATE_WIDGETS,
      } from './actionTypes';
import React from 'react';
import client from '../utils/graphqlClient'
import { DASHBOARD_QUERY } from './graphqlQuery'

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const toggleCheckBox = (payload) => ({
  type: TOGGLE_CHECKBOX,
  payload: payload,
});


function shouldFetchDataForDashboardDataTable(state) {
  return !(state.dashboard
  				&& state.dashboard.datatable
  						&& state.dashboard.datatable.isFetched
                && state.dashboard.checkbox
                  && state.dashboard.checkbox.isFetched
                    && state.dashboard.widgets
                      && state.dashboard.widgets.isFetched);
}


function receiveDashboard(json) {
  return {
    type: RECEIVE_DASHBOARD,
    payload: 
    {
      data:json.data
    }
  }
}


function error(error,type) {
  return {
    type: type,
    payload: 
    {
      data:error
    }
  }
}


function fetchDashboard(){
    return dispatch => { 
      return client
      .query({
        query: DASHBOARD_QUERY
      })
      .then(result => dispatch(receiveDashboard(result)))
      .catch(error => dispatch(receiveDashboard(error,DASHBOARD_QUERY_ERR)));
      }
}




export function fetchDataForDashboardDataTable() {
  return (dispatch, getState) => {
    if (shouldFetchDataForDashboardDataTable(getState())) {
      return dispatch(fetchDashboard());
    }
  };
}
