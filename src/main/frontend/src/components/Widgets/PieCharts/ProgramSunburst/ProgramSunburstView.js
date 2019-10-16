/* eslint-disable */
import React, { PureComponent } from 'react';
import { Sunburst } from 'react-vis';


function updateDate(data){

	
}

export default class ProgramSunburst extends PureComponent {
    render() {

	   const {
	      data: sunburstData, width, height
	    } = this.props;

        const myData = {
            "title": "analytics",
            "color": "#523175",
            "children": [{
                    "title": "cluster",
                    "color": "#523175",
                    "children": [
                        { "title": "AgglomerativeCluster","color": "#523175",  "size": 500 },
                        { "title": "CommunityStructure", "color": "#523175", "size": 3812 },
                        { "title": "HierarchicalCluster", "color": "#523175", "size": 6714 },
                        { "title": "MergeEdge", "color": "#523175", "size": 743 }
                    ]
                },
                {
                    "title": "graph",
                    "children": [{
                            "title": "BetweennessCentrality",
                            
                            "size": 3534,
                            "children": [{
                                "title": "graph2",
                                "children": [
                                    { "title": "BetweennessCentrality",  "size": 3534 },
                                    { "title": "LinkDistance",  "size": 5731 },
                                    { "title": "MaxFlowMinCut",  "size": 7840 },
                                    { "title": "ShortestPaths",  "size": 5914 },
                                    { "title": "SpanningTree",  "size": 3416 }
                                ]
                            }, ]
                        },
                        { "title": "LinkDistance",  "size": 5731 },
                        { "title": "MaxFlowMinCut",  "size": 7840 },
                        { "title": "ShortestPaths",  "size": 5914 },
                        { "title": "SpanningTree",  "size": 3416 }
                    ]
                },
                {
                    "title": "optimization",
                    "children": [
                        { "title": "AspectRatioBanker",  "size": 7074 }
                    ]
                }
            ]
        }
        return (
            <Sunburst
			        hideRootNode
			        animation
			        colorType="literal"
			        style={{
			            stroke: '#ddd',
			            strokeOpacity: 0.3,
			            strokeWidth: '0.5'
			          }}
			        data={myData}
			        height={height}
			        width={width}
      		/>
        );
    }
}