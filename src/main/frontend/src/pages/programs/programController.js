import React from 'react';
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from 'react-apollo-hooks';
import { Typography } from '../../components/Wrappers/Wrappers';
import Programs from './programs';

const GET_PROGRAM_DATA_QUERY = gql`
{
  program(orderBy: program_sort_order_asc)
  {
    program_name
    program_acronym
    program_full_description
    program_short_description
    program_sort_order
    program_external_url
    studies
    {
      clinical_study_designation
    }
  }
}
`;

const ProgramCardController = () => {
  const { data, loading, error } = useQuery(GET_PROGRAM_DATA_QUERY);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <Typography variant="headline" color="warning" size="sm">
        {error && `An error has occurred in loading program cards components: ${error}`}
      </Typography>
    );
  }
  return <Programs data={data} />;
};

export default ProgramCardController;
