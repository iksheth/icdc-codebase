import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = [
  "#523175",
  "#6e7ff5",
  "#fc4b5b",
  "#2b69a3",
  "#287d6d",
  "#af66ff"
];

export default class GenderDonut extends PureComponent {
  render() {
    var genderDataObj = this.props.data;
    // Ajay Need to replace this with a utility function
    var data = genderDataObj.map(function(obj) {
      return {
        name: obj.gender,
        value: obj.cases
      };
    });
    return (
      <PieChart width={400} height={200} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx='55%'
          cy='50%'
          innerRadius={60}
          outerRadius={95}
          fill='#8884d8'
          paddingAngle={1}
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }
}
