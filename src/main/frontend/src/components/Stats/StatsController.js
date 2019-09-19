import gql from 'graphql-tag';

const GET_STATS = gql`{
  numberOfStudies
  numberOfCases
  numberOfSamples
  numberOfFiles
  numberOfAliquots
  }
  `;

export default (GET_STATS);
