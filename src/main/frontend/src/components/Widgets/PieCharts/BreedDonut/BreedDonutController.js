import React from "react";
import BreedDonutView from "./BreedDonutView";

const BreedDonutController = ({ classes, theme,data, ...props }) => {
  return <BreedDonutView data={data} />;
};

export default BreedDonutController;
