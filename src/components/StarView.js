import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

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
    const { color, description, diameter, starClass, luminosity, temperature, mass } = this.props;
    const { r, g, b } = this.hexToRgb(color.slice(1));
    let { coefficient, exponent } = this.numberToBase10Exponent(luminosity);
    coefficient = coefficient.toString().slice(0, 4);

    return (
      <Card className="star-view">
        <Card.Header className="star-visual-backdrop">
          <div className="star-visual"
            style={{
              backgroundColor: color,
              width: diameter,
              height: diameter,
              boxShadow: `0 0 5px 5px rgba(${r},${g},${b},0.5)`,
            }}/>
        </Card.Header>
        <Card.Body className="star-info">
          <Card.Title>{`${starClass} Star`}</Card.Title>
          <Card.Text key="description"><strong>Description: </strong>{description}</Card.Text>
          <Card.Text key="mass"><strong>Mass: </strong>{`${mass}M`}<sub>☉</sub>
          </Card.Text>
          <Card.Text key="luminosity">
            <strong>Luminosity: </strong>{`${coefficient} x `}10<sup>{exponent}</sup>L<sub>☉</sub>
          </Card.Text>
          <Card.Text key="temperature">
            <strong>Temperature: </strong>{`${temperature}K`}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
};

StarView.propTypes = {
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  diameter: PropTypes.number.isRequired,
  starClass: PropTypes.string.isRequired,
  luminosity: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
  mass: PropTypes.number.isRequired,
};

export default StarView;
