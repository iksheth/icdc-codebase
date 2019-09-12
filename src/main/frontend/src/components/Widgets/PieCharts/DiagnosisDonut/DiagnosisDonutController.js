import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import DiagnosisDonutView from "./DiagnosisDonutView";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "../../../Wrappers/Wrappers";

const GET_BREED_DATA_QUERY = gql`
  {
    caseCountByDiagnosis {
      cases
      diagnosis
    }
  }
`;

const DiagnosisDonutController = ({ classes, theme, ...props }) => {
  return (
    <Query query={GET_BREED_DATA_QUERY}>
      {({ data, loading, error }) => {
        return loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant='headline' color='warning' size='sm'>
            {error &&
              `An error has occurred in loading stats component: ${error}`}
          </Typography>
        ) : (
          <DiagnosisDonutView data={data.caseCountByDiagnosis} />
        );
      }}
    </Query>
  );
};

export default DiagnosisDonutController;
