import React from "react";
import GenderDonutView from "./GenderDonutView";

const GenderDonutController = ({ classes, theme,data, ...props }) => {
  return <GenderDonutView data={data} />;
};

export default GenderDonutController;
