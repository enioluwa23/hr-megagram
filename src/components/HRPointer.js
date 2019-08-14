import React from 'react';
import PropTypes from 'prop-types';

export const HRPointer = (props) => {
  return (
    <div
      className="hr-pointer"
      style={{
        top: props.position.y,
        left: props.position.x,
        backgroundColor: props.color,
      }}/>
  );
};

HRPointer.propTypes = {
  position: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
};

export default HRPointer;
