import React from 'react';
import { CustomPicker } from 'react-color';
import { Saturation } from 'react-color/lib/components/common';
import HRPointer from './HRPointer';

class HRDiagram extends React.Component {
  render() {
    return (
      <div className="hr-diagram">
        <Saturation
          {...this.props}
          pointer={HRPointer}
        />
      </div>
    );
  }
}

// eslint-disable-next-line
export default CustomPicker(HRDiagram);
