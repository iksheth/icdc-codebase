import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CaseView from './caseView';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from "../../../components/Wrappers/Wrappers";



const GET_STUDYTABLE_DATA_QUERY = gql`{
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


const caseContainer = ({ classes, theme, ...props }) => {
    return (
        <Query query={GET_STUDYTABLE_DATA_QUERY}>
            {({ data, loading, error }) => {
                return (loading ? < CircularProgress /> : (error ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography> :
                    <CaseView data={data} />
                ));
            }
            }
        </Query>
    );
};

export default caseContainer;

