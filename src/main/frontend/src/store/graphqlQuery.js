/* eslint-disable */
import gql from 'graphql-tag';

export const DASHBOARD_QUERY = gql`
  {
    caseCountByBreed {
      cases
      breed
    }
    caseCountByGender {
      cases
      gender
    }
    caseCountByDiagnosis {
      cases
      diagnosis
    }
    caseCountByDiseaseSite { 
      cases
      disease_site 
    }
    caseCountByStageOfDisease { 
      cases
      stage_of_disease 
    }
    studiesByProgram {
      program_id
      clinical_study_designation
      clinical_study_name
      clinical_study_type
      numberOfCases
   }

      caseOverview {   
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

