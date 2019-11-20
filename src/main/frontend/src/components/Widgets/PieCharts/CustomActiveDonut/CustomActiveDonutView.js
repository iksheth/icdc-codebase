import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';

const COLORS = [
  '#39C0F0',
  '#004CF3',
  '#FF7F15',
  '#4C3112',
  '#8DE260',
  '#437200',
  '#FBB35D',
  '#965200',
  '#69CBED',
  '#113801',
  '#4BC41E',
  '#434C4F',
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value, textColor,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={textColor} fontSize="10px" fontFamily='"Open Sans", sans-serif'>{payload.name}</text>
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
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={textColor} fontSize="10px" fontFamily='"Open Sans", sans-serif'>{`${value} Cases`}</text>
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
      data: DataObj, width, height, innerRadius, outerRadius, cx, cy, textColor,
    } = this.props;
    const data = DataObj.map((obj) => ({
      name: obj.item,
      value: obj.cases,
    }));

    const { activeIndex } = this.state;

    return (
      <PieChart width={width} height={height} textColor={textColor}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={cx}
          cy={cy}
          textColor={textColor}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          dataKey="value"
          onMouseEnter={this.onPieEnter}
          blendStroke
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} textColor={textColor} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}
