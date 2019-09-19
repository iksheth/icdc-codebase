import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import StudyDetailView from "./components/studyDetailView"
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from "../../components/Wrappers/Wrappers";


const GET_STUDYTABLE_DATA_QUERY = gql`
  query Study($clinical_study_designation: String) {
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

const StudyDetailContainer = ({match}) => {


    return (
        <Query query={GET_STUDYTABLE_DATA_QUERY} variables={{"clinical_study_designation":match.params.id}}>
            {({ data, loading, error }) => {
                return (
                        loading ? < CircularProgress /> : 
                        (
                          error ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography> :
                            (
                              data && data.study[0] ? <StudyDetailView data={data} /> : <Typography variant="headline" color="warning" size="sm">{`No data`}</Typography> 
                              )
                         ) 
                      );
            }
            }
        </Query>
    );
};

export default StudyDetailContainer;

