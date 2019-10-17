/* eslint-disable */
import React, { PureComponent } from 'react';
import { Sunburst, LabelSeries } from 'react-vis';

 const myData = {
            "title": "analytics",
            "color": "#523175",
            "children": [{
                    "title": "cluster",
                    "color": "#523175",
                    "children": [{
                        "title": "MergeEdge",
                        "children": [
                            { "title": "BetweennessCentrality", "size": 1 },
                            { "title": "LinkDistance", "size": 1 },
                            { "title": "MaxFlowMinCut", "size": 1 },
                            { "title": "ShortestPaths", "size": 1 },
                            { "title": "SpanningTree", "size": 1 }
                        ]
                    }]
                },
                {
                    "title": "graph",
                    "children": [{
                            "title": "BetweennessCentrality",
                            "children": [{
                                "title": "graph2",
                                "children": [
                                    { "title": "BetweennessCentrality", "size": 1 },
                                    { "title": "LinkDistance", "size": 1 },
                                    { "title": "MaxFlowMinCut", "size": 1 },
                                    { "title": "ShortestPaths", "size": 1 },
                                    { "title": "SpanningTree", "size": 1 }
                                ]
                            }, ]
                        },
                        {
                            "title": "SpanningTree",
                            "children": [
                                { "title": "BetweennessCentrality", "size": 1 },
                                { "title": "LinkDistance", "size": 1 },
                                { "title": "MaxFlowMinCut", "size": 1 },
                                { "title": "ShortestPaths", "size": 1 },
                                { "title": "SpanningTree", "size": 1 }
                            ]
                        }
                    ]
                },
            ]
        }

const LABEL_STYLE = {
    fontSize: '15px',
    textAnchor: 'middle'
};

function getKeyPath(node) {
  if (!node.parent) {
    return ['root'];
  }

  return [(node.data && node.data.title) || node.title].concat(
    getKeyPath(node.parent)
  );
}


function updateData(data, keyPath) {
  if (data.children) {
    data.children.map(child => updateData(child, keyPath));
  }

  data.style = {
    ...data.style,
    fillOpacity: keyPath && !keyPath[data.title] ? 0.2 : 1
  };

  return data;
}

export default class ProgramSunburst extends PureComponent {

    

    constructor(props) {
      super(props);
      // Don't call this.setState() here!
      this.state = {
        pathValue: false,
        widgetData: myData,
        finalValue: 'SUNBURST',
      };
    }

  

    render() {
        const { finalValue,pathValue,widgetData} = this.state;
        const {
            data: sunburstData,
            width,
            height
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
                        strokeWidth: '0.5'
                      }}
                    onValueMouseOver={node => {
                         
                         const path = getKeyPath(node).reverse();
                         const pathAsMap = path.reduce((res, row) => {
                             res[row] = true;
                             return res;
                         }, {});
                         const data = updateData(widgetData, pathAsMap);
                         this.setState({
                             finalValue: node.title,
                             pathValue: path.join(' > '),
                             data: data,
                         });
                         }
                     }
                     onValueMouseOut = {() => {
                        this.setState({
                             pathValue: false,
                             finalValue: false,
                             data: updateData(widgetData, false)
                         })
                       } 
                     }
            >
            {finalValue && (<LabelSeries data={[{x: 0, y: 0, label: finalValue, style: LABEL_STYLE }]} /> )}
         </Sunburst>
        );
    }
}