import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectedFilesView from './selectedFilesView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_MY_CASES_DATA_QUERY } from '../../utils/graphqlQueries';

const userSelectedCases = JSON.parse(localStorage.getItem('userSelectedCases'));

const SelectedFiles = () => (
  <Query query={GET_MY_CASES_DATA_QUERY} variables={{ caseIds: userSelectedCases }}>
    {({ data, loading, error }) => (loading ? <CircularProgress /> : (error ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
      : <SelectedFilesView data={data} />
    ))}
  </Query>
);


export default SelectedFiles;
