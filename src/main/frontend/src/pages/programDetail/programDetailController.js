import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProgramDetailView from './components/programDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';


const GET_PROGRAM_DETAIL_DATA_QUERY = gql`
  query program($programTitle: String!) {
    program(program_acronym: $programTitle)
    { 
      program_name
      program_acronym
      program_short_description
      program_full_description
      program_external_url
      program_sort_order
      }
      studiesByProgramId(program_id: $programTitle)
      { 
        program_id
        clinical_study_id
        clinical_study_designation
        clinical_study_name
        clinical_study_description
        clinical_study_type
        date_of_iacuc_approval
        dates_of_conduct
        numberOfCases
        }
 }`;

const ProgramDetailContainer = ({ match }) => (
  <Query query={GET_PROGRAM_DETAIL_DATA_QUERY} variables={{ programTitle: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (
          error || !data || !data.program[0] ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
            : <ProgramDetailView data={data} />
        )
    )}
  </Query>
);

export default ProgramDetailContainer;
