import React from 'react';
import GenderDonutView from './GenderDonutView';

const GenderDonutController = ({
  data, ...props
}) => <GenderDonutView data={data} {...props} />;

export default GenderDonutController;
