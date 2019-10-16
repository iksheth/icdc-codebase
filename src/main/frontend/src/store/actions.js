import {
  DASHBOARD_QUERY_ERR,
  TOGGLE_SIDEBAR,
  RECEIVE_DASHBOARD,
  TOGGLE_CHECKBOX,
  READY_DASHBOARD,
  REQUEST_DASHBOARD,
} from './actionTypes';
import client from '../utils/graphqlClient';
import { DASHBOARD_QUERY } from './graphqlQuery';

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const toggleCheckBox = (payload) => ({
  type: TOGGLE_CHECKBOX,
  payload,
});


function shouldFetchDataForDashboardDataTable(state) {
  return !(state.dashboard.isFetched);
}

function postRequestFetchDataDashboard() {
  return {
    type: REQUEST_DASHBOARD,
  };
}

function receiveDashboard(json) {
  return {
    type: RECEIVE_DASHBOARD,
    payload:
    {
      data: json.data,
    },
  };
}


function errorhandler(error, type) {
  return {
    type,
    error,
  };
}


function readyDashboard() {
  return {
    type: READY_DASHBOARD,
  };
}


function fetchDashboard() {
  return (dispatch) => {
    dispatch(postRequestFetchDataDashboard());
    return client
      .query({
        query: DASHBOARD_QUERY,
      })
      .then((result) => dispatch(receiveDashboard(result)))
      .catch((error) => dispatch(errorhandler(error, DASHBOARD_QUERY_ERR)));
  };
}


export function fetchDataForDashboardDataTable() {
  return (dispatch, getState) => {
    if (shouldFetchDataForDashboardDataTable(getState())) {
      return dispatch(fetchDashboard());
    }
    return dispatch(readyDashboard());
  };
}
