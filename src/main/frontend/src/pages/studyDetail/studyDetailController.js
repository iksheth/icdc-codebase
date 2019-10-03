import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import StudyDetailView from './components/studyDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';


const GET_STUDY_DETAIL_DATA_QUERY = gql`
  query Study($csd: String!) {

   sampleCountOfStudy(study_code:$csd)

   fileCountOfStudy(study_code: $csd)

   aliguotCountOfStudy(study_code: $csd)

   caseCountOfStudy(study_code: $csd)

   filesOfStudy(study_code: $csd){
    file_type
   }

  study(clinical_study_designation: $csd){
    clinical_study_id
    clinical_study_name
    clinical_study_designation
    clinical_study_description
    clinical_study_type
    date_of_iacuc_approval
    dates_of_conduct
    cohorts{
        cohort_dose
        cohort_description
    }

    study_arms{
      arm
      ctep_treatment_assignment_code
      cohorts{
        cohort_dose
        cohort_description
      }

    }

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
  <Query query={GET_STUDY_DETAIL_DATA_QUERY} variables={{ csd: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (
          error || !data || !data.study[0] ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
            : <StudyDetailView data={data} />
        )
    )}
  </Query>
);

export default StudyDetailContainer;
