import React from "react";
import gql from "graphql-tag";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "../../components/Wrappers/Wrappers";
import { useQuery } from "react-apollo-hooks";
import Dashboard from "./dashboard";

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
  }
`;

const DashboardController = ({ classes, theme, ...props }) => {
  const { data, loading, error } = useQuery(GET_DONUT_DATA_QUERY);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <Typography variant='headline' color='warning' size='sm'>
        {error && `An error has occurred in loading stats component: ${error}`}
      </Typography>
    );
  }
  return <Dashboard data={data} />;
};

export default DashboardController;
