import React from 'react';
import DiagnosisDonutView from './DiagnosisDonutView';

const DiagnosisDonutController = ({
  data, ...props
}) => <DiagnosisDonutView data={data} {...props} />;

export default DiagnosisDonutController;
