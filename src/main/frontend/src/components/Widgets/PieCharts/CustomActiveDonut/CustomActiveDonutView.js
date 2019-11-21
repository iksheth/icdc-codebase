import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell, ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#39C0F0',
  '#004CF3',
  '#FF7F15',
  '#4C3112',
  '#8DE260',
  '#437200',
];

const renderActiveShape = (props) => {
  // const RADIAN = Math.PI / 180;
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value, textColor,
  } = props;
  // const sin = Math.sin(-RADIAN * midAngle);
  // const cos = Math.cos(-RADIAN * midAngle);
  // const sx = cx + (outerRadius + 2) * cos;
  // const sy = cy + (outerRadius + 2) * sin;
  // const mx = cx + (outerRadius + 5) * cos;
  // const my = cy + (outerRadius + 5) * sin;
  // const ex = mx + (cos >= 0 ? 1 : -1) * 20;
  // const ey = my;
  // const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      <text y={20} fill={textColor} fontSize="12px" fontWeight="600" fontFamily="Raleway">{payload.name}</text>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill={textColor} fontSize="12px" fontWeight="600" fontFamily="Raleway">{`${value}`}</text>
      <text x={cx} y={cy} dy={12} textAnchor="middle" fill={textColor} fontSize="12px" fontWeight="600" fontFamily="Raleway">Cases</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 8}
        fill={fill}
      />

    </g>
  );
};


export default class CustomActiveDonut extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const {
      data: DataObj, textColor,
    } = this.props;
    const data = DataObj.map((obj) => ({
      name: obj.item,
      value: obj.cases,
    }));

    const { activeIndex } = this.state;

    return (
      <ResponsiveContainer width={250} height={220}>
        <PieChart textColor={textColor}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={125}
            cy={90}
            textColor={textColor}
            innerRadius={50}
            outerRadius={75}
            dataKey="value"
            onMouseEnter={this.onPieEnter}
            blendStroke
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} textColor={textColor} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
