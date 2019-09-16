import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Tooltip, Cell,
} from 'recharts';

const data = [
  { name: 'III', value: 400 },
  { name: 'IIIA', value: 300 },
  { name: 'IIIB', value: 300 },
  { name: 'IV', value: 200 },
  { name: 'V', value: 400 },
  { name: 'VA', value: 300 },
  { name: 'VB', value: 300 },
  { name: 'VC', value: 400 },
  
];
const COLORS = ['#523175','#6e7ff5','#fc4b5b','#2b69a3','#287d6d','#af66ff' ];


export default class TumorDonut extends PureComponent {

  render() {
    return (
      <PieChart width={400} height={200} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx="55%"
          cy="50%"
          innerRadius={60}
          outerRadius={95}
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
