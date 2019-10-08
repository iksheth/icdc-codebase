import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import CasesView from './casesView';
import { Typography } from '../../components/Wrappers/Wrappers';


const GET_CASES_QUERY = gql`
   query Case($study_id: String!) {

   sampleCountOfStudy(study_code:$study_id)

   fileCountOfStudy(study_code: $study_id)

   aliguotCountOfStudy(study_code: $study_id)

   caseCountOfStudy(study_code: $study_id)

   caseOverview(study_codes:[$study_id]) {   
        case_id  
        study_code   
        study_type   
        breed   
        diagnosis   
        stage_of_disease   
        age   
        sex   
        neutered_status
     }
  }
  `;

const studyCaseContainer = ({ match }) => (
  <Query query={GET_CASES_QUERY} variables={{ study_id: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (
          error || !data || !data.caseOverview ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
            : <CasesView data={({ ...data, title: `${match.params.id}'s Cases` })} />
        )
    )}
  </Query>
);
export default studyCaseContainer;
