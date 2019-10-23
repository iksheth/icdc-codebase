import gql from 'graphql-tag';

export const DASHBOARD_QUERY = gql`{
    numberOfStudies
    numberOfCases
    numberOfSamples
    numberOfFiles
    numberOfAliquots
  
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

    caseCountByStudyCode{
      study_code
     cases
    }

   caseCountByStudyType {
     study_type
     cases
    }

    caseCountByAge {
     age
     cases
    }

    caseCountByDataType {
     data_type
     cases
    }
    caseCountByProgram {
     program
     cases
    }

   caseOverview{   
        case_id  
        program
        study_code   
        study_type   
        breed   
        diagnosis   
        stage_of_disease   
        age   
        sex   
        neutered_status
        data_types
        disease_site
        samples
        files
     }
  }`;

// not used
export const GET_STUDYTABLE_DATA_QUERY = gql`{
    studiesByProgram {
        program_id
        clinical_study_designation
        clinical_study_name
         clinical_study_type
         numberOfCases
    }
  }
  `;
