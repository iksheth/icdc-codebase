import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import CaseDetailView from './caseDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';


const GET_CASE_DETAIL_DATA_QUERY = gql`
  query Case($case_id: String!) {
    sampleCountOfCase(case_id:$case_id)
    fileCountOfCase(case_id: $case_id)
    aliquotCountOfCase(case_id: $case_id)
    fileCountOfCase(case_id: $case_id)
    case(case_id:$case_id){
        case_id
        patient_id
        patient_first_name
        study{
            study_sites{
                site_short_name
            }
            clinical_study_designation
      
        }
        demographic{
            breed
            sex
            patient_age_at_enrollment
        }
        cohort{
            cohort_description
            study_arm{
                arm
                ctep_treatment_assignment_code
            }
        }
        enrollment{
            date_of_registration
            patient_subgroup
            date_of_informed_consent
        }
        diagnoses{
            disease_term
            stage_of_disease
            date_of_diagnosis
            primary_disease_site
            histological_grade
            histology_cytopathology
        }
    }
    filesOfCase(case_id:$case_id)
    {   
        parent 
        file_name 
        file_type 
        file_description 
        file_format 
        file_size 
        md5sum 

    }
 }`;

const CaseDetailContainer = ({ match }) => (
  <Query query={GET_CASE_DETAIL_DATA_QUERY} variables={{ case_id: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (
          error || !data || data.case[0].case_id !== match.params.id ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
            : <CaseDetailView data={data} />
        )
    )}
  </Query>
);

export default CaseDetailContainer;
