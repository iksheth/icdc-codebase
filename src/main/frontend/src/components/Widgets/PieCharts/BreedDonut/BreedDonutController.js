import React from 'react';
import BreedDonutView from './BreedDonutView';

const BreedDonutController = ({
  data, ...props
}) => <BreedDonutView data={data} {...props} />;

export default BreedDonutController;
