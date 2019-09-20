/* eslint-disable */

import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import StudyDetailView from './components/studyDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';


const GET_STUDYTABLE_DATA_QUERY = gql`
  query Study($clinical_study_designation: String!) {

   sampleCountOfStudy(study_code:$clinical_study_designation)

   fileCountOfStudy(study_code: $clinical_study_designation)

   aliguotCountOfStudy(study_code: $clinical_study_designation)

   caseCountOfStudy(study_code: $clinical_study_designation)

   fileOfStudy(study_code: $clinical_study_designation){
    file_type
   }

  study(clinical_study_designation: $clinical_study_designation){
    clinical_study_id
    clinical_study_name
    clinical_study_designation
    clinical_study_description
    clinical_study_type
    date_of_iacuc_approval
    dates_of_conduct
    principal_investigators{
      pi_first_name
      pi_last_name
      pi_middle_initial
    }
    cases{
      case_id
      diagnoses{
        disease_term
      }
    }
  }
  
 }`;

const StudyDetailContainer = ({ match }) => (
  <Query query={GET_STUDYTABLE_DATA_QUERY} variables={{ clinical_study_designation: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (
          error ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
            : (
              data && data.study[0] ? <StudyDetailView data={data} /> : <Typography variant="headline" color="warning" size="sm">No data</Typography>
            )
        )
    )}
  </Query>
);

export default StudyDetailContainer;
