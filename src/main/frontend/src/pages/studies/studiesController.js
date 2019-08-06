import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Studies from './studiesView';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from "../../components/Wrappers/Wrappers";



const GET_STUDYTABLE_DATA_QUERY = gql`{
    studiesByProgram {
        program_id
        clinical_study_designation
        clinical_study_name
         clinical_study_type
         numberOfCases
    }
  }
  `;

//   const GET_STUDYTABLE_DATA = () => {
//     return (
//     <Query query={GET_STUDYTABLE_DATA_QUERY}>
//     {({ data }) => {
//         return data;
//       }}
// }
// </Query>
//     )
//   }

const studiesContainer = ({ classes, theme, ...props }) => {
    return (
        <Query query={GET_STUDYTABLE_DATA_QUERY}>
            {({ data, loading, error }) => {
                return (loading ? < CircularProgress /> : (error ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography> :
                    <Studies data={data} />
                ))
            }
            }
        </Query>
    );
};

export default studiesContainer;

