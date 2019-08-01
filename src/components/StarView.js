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

  render() {
    const { color, diameter, starClass, luminosity, temperature, mass } = this.props;
    const { r, g, b } = this.hexToRgb(color.slice(1));
    return (
      <Card className="star-view">
        <Card.Header
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'black',
          }}>
          <div className="star-visual"
            style={{
              backgroundColor: color,
              width: diameter,
              height: diameter,
              boxShadow: `0 0 5px 3px rgba(${r},${g},${b},0.5)`,
            }}/>
        </Card.Header>
        <Card.Body>
          <Card.Title>{`${starClass}-Class Star`}</Card.Title>
          <Card.Text>
            <p key="luminosity">{`Luminosity: ${luminosity}`}</p>
            <p key="temperature">{`Temperature: ${temperature}`}</p>
            <p key="mass">{`Mass: ${mass}`}</p>
          </Card.Text>
        </Card.Body>
      </Card>
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
