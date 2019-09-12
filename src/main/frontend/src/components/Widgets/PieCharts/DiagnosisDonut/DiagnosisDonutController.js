import React from "react";
import DiagnosisDonutView from "./DiagnosisDonutView";

const DiagnosisDonutController = ({ classes, theme,data, ...props }) => {
  return <DiagnosisDonutView data={data} />
};

export default DiagnosisDonutController;
