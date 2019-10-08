import React from 'react';
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from 'react-apollo-hooks';
import { Typography } from '../../components/Wrappers/Wrappers';
import Dashboard from './dashboard';

// Ajay Need to break Widgets into seperate dashboard component

const GET_DONUT_DATA_QUERY = gql`
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
      case_ids
   }
  }
`;

const DashboardController = () => {
  const { data, loading, error } = useQuery(GET_DONUT_DATA_QUERY);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <Typography variant="headline" color="warning" size="sm">
        {error && `An error has occurred in loading stats component: ${error}`}
      </Typography>
    );
  }
  return <Dashboard data={data} />;
};

export default DashboardController;
