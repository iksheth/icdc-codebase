import React from 'react';
import TumorDonutView from './TumorDonutView';

const TumorDonutController = ({
  data, ...props
}) => <TumorDonutView data={data} {...props} />;

export default TumorDonutController;
