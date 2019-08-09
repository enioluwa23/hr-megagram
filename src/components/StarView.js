import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'react-bootstrap';

class StarView extends React.Component {
  handleClick(data) {
    this.setState({ clickLocation: data.location, color: data.color });
  }

  hexToRgb(hex) {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, b, g };
  }

  numberToBase10Exponent(numStr) {
    const num = parseFloat(numStr);
    const [coefficient, exponent] = num.toExponential().split('e').map((item) => parseFloat(item));
    return { coefficient, exponent };
  }

  render() {
    const { color, diameter, starClass, luminosity, temperature, mass } = this.props;
    const { r, g, b } = this.hexToRgb(color.slice(1));
    let { coefficient, exponent } = this.numberToBase10Exponent(luminosity);
    coefficient = coefficient.toString().slice(0, 4);

    return (
      <Media className="star-view">
        <div className="star-visual"
          style={{
            backgroundColor: color,
            width: diameter,
            height: diameter,
            boxShadow: `0 0 5px 5px rgba(${r},${g},${b},0.5)`,
          }}/>
        <Media.Body>
          {/* <Card.Header
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'black',
          }}> */}
          {/* </Card.Header> */}
          <h5>{`${starClass}-Class Star`}</h5>
          <p key="luminosity">{`Luminosity: ${coefficient} x `}10<sup>{exponent}</sup></p>
          <p key="temperature">{`Temperature: ${temperature}K`}</p>
          <p key="mass">{`Mass: ${mass}`}</p>
        </Media.Body>
      </Media>
    );
  }
};

StarView.propTypes = {
  color: PropTypes.string.isRequired,
  diameter: PropTypes.number.isRequired,
  starClass: PropTypes.string.isRequired,
  luminosity: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
  mass: PropTypes.number.isRequired,
};

export default StarView;
