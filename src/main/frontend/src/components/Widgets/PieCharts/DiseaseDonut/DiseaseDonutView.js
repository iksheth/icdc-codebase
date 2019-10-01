import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Tooltip, Cell,
} from 'recharts';

const COLORS = ['#523175', '#6e7ff5', '#fc4b5b', '#2b69a3', '#287d6d', '#af66ff'];

export default class DiseaseDonut extends PureComponent {
  render() {
    const {
      data: diseaseSiteDataObj, width, height, innerRadius, outerRadius, cx, cy,
    } = this.props;

    const data = diseaseSiteDataObj.map((obj) => ({
      name: obj.disease_site,
      value: obj.cases,
    }));

    return (
      <PieChart width={width} height={height} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          paddingAngle={1}
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }
}
