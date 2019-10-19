import React, { PureComponent } from 'react';
import { Sunburst, LabelSeries } from 'react-vis';


const LABEL_STYLE = {
  fontSize: '15px',
  textAnchor: 'middle',
};

function getKeyPath(node) {
  if (!node.parent) {
    return ['root'];
  }

  return [(node.data && node.data.title) || node.title].concat(
    getKeyPath(node.parent),
  );
}


function updateData(d, keyPath) {
  const data = d;
  if (data.children) {
    data.children.map((child) => updateData(child, keyPath));
  }

  data.style = {
    ...data.style,
    fillOpacity: keyPath && !keyPath[data.title] ? 0.2 : 1,
  };

  return data;
}

export default class ProgramSunburst extends PureComponent {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      widgetData: data,
      finalValue: 'program studies sunburst',
    };
  }


  render() {
    const { finalValue, widgetData } = this.state;
    const {
      width,
      height,
    } = this.props;


    return (
      <Sunburst
        hideRootNode
        animation
        colorType="literal"
        data={widgetData}
        height={height}
        width={width}
        style={{
          stroke: '#ddd',
          strokeOpacity: 0.3,
          strokeWidth: '0.5',
        }}
        onValueMouseOver={(node) => {
          const path = getKeyPath(node).reverse();
          const pathAsMap = path.reduce((res, row) => {
            res[row.toString()] = true;
            return res;
          }, {});
          const data = updateData(widgetData, pathAsMap);
          this.setState({
            finalValue: node.title,
            widgetData: data,
          });
        }}
        onValueMouseOut={() => {
          this.setState({
            finalValue: false,
            widgetData: updateData(widgetData, false),
          });
        }}
      >
        {finalValue && (
        <LabelSeries data={[{
          x: 0, y: 0, label: finalValue, style: LABEL_STYLE,
        }]}
        />
        )}
      </Sunburst>
    );
  }
}
