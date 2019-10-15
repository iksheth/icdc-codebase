/* eslint-disable */
import React, { Component } from 'react';
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from 'react-apollo-hooks';
import { Typography } from '../../components/Wrappers/Wrappers';
import Dashboard from './dashboard';
import { connect } from 'react-redux'
import {fetchDataForDashboardDataTable} from "../../store/actions"


class DashboardController extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataForDashboardDataTable());
  }

  render() {
   return this.props.dashboard.widgets?  <Dashboard data={this.props.dashboard.widgets} /> :"";
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(DashboardController);
