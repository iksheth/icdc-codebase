import React from 'react';
import DiseaseDonutView from './DiseaseDonutView';

const DiseaseDonutController = ({
  data, ...props
}) => <DiseaseDonutView data={data} {...props} />;

export default DiseaseDonutController;
