import React, { PureComponent } from 'react';
import sunburstImage from '../../../../assets/dashboard/dashboard_sunburst.png';


export default class ProgramSunburst extends PureComponent {
  render() {
    return (
      <img src={sunburstImage} alt="sunburst" />
    );
  }
}
