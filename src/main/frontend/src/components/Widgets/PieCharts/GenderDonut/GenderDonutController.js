import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import GenderDonutView from "./GenderDonutView";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "../../../Wrappers/Wrappers";

const GET_GENDER_DATA_QUERY = gql`
  {
    caseCountByGender {
      cases
      gender
    }
  }
`;

const GenderDonutController = ({ classes, theme, ...props }) => {
  return (
    <Query query={GET_GENDER_DATA_QUERY}>
      {({ data, loading, error }) => {
        return loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant='headline' color='warning' size='sm'>
            {error &&
              `An error has occurred in loading stats component: ${error}`}
          </Typography>
        ) : (
          <GenderDonutView data={data.caseCountByGender} />
        );
      }}
    </Query>
  );
};

export default GenderDonutController;
