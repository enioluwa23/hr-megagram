import React from 'react';
import './App.css';
import HRDiagram from './components/HRDiagram';
import StarView from './components/StarView';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clickLocation: null,
      color: null,
      scale: null,
    };

    this.getStarClass = this.getStarClass.bind(this);
    this.getStarLuminosity = this.getStarLuminosity.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderStar = this.renderStar.bind(this);
  }

  handleClick(data) {
    this.setState({
      clickLocation: data.location,
      color: data.color,
      scale: data.width,
    });
  }

  getStarLuminosity(yLoc) {
    const scale = parseFloat(this.state.scale);
    return Math.pow(10, -5.05 + (11.4 * (yLoc / scale)));
  }

  _getStarClass(fraction, cutoff, range, luminosity) {
    const mkClassName = Math.floor((fraction - cutoff) * ((79 * 9)/range) + 1).toString();
    const lumClassName = 'V';
    return mkClassName + lumClassName;
  }

  getStarClass(xLoc, luminosity) {
    const { scale } = this.state;
    const fraction = xLoc / scale;

    if (fraction < 18/79) {
      return 'O' + this._getStarClass(fraction, 0, 18, luminosity);
    } else if (fraction < 39/79) {
      return 'B' + this._getStarClass(fraction, 18/79, 21, luminosity);
    } else if (fraction < 46/79) {
      return 'A' + this._getStarClass(fraction, 39/79, 7, luminosity);
    } else if (fraction < 50/79) {
      return 'F' + this._getStarClass(fraction, 46/79, 4, luminosity);
    } else if (fraction < 58/79) {
      return 'G' + this._getStarClass(fraction, 50/79, 8, luminosity);
    } else if (fraction < 67/79) {
      return 'K' + this._getStarClass(fraction, 58/79, 9, luminosity);
    } else {
      return 'M' + this._getStarClass(fraction, 67/79, 12, luminosity);
    }
  }

  _getStarTemperature(scale, xPos, base, range, min, maxIncrease) {
    const offset = xPos - (base * scale);
    const increase = maxIncrease * (offset /(range * scale));
    return Math.round(min + increase);
  }

  getStarTemperature(xLoc, starClass) {
    const { scale } = this.state;
    const xPos = scale - xLoc;

    if (starClass.startsWith('O')) {
      return this._getStarTemperature(scale, xPos, 61/79, 18/79, 28000, 22000);
    } else if (starClass.startsWith('B')) {
      return this._getStarTemperature(scale, xPos, 40/79, 21/79, 10000, 18000);
    } else if (starClass.startsWith('A')) {
      return this._getStarTemperature(scale, xPos, 33/79, 7/79, 7500, 2500);
    } else if (starClass.startsWith('F')) {
      return this._getStarTemperature(scale, xPos, 29/79, 4/79, 6000, 1500);
    } else if (starClass.startsWith('G')) {
      return this._getStarTemperature(scale, xPos, 21/79, 8/79, 5000, 1000);
    } else if (starClass.startsWith('K')) {
      return this._getStarTemperature(scale, xPos, 12/79, 9/79, 3500, 1500);
    } else if (starClass.startsWith('M')) {
      return this._getStarTemperature(scale, xPos, 0, 12/79, 1300, 2200);
    }
  }

  getStarMass(yLoc) {
    return 1000;
  }

  renderStar() {
    const { color, clickLocation, scale } = this.state;
    if (!color || !clickLocation) {
      return null;
    }

    const { x, y } = clickLocation;
    const xInt = parseInt(x);
    const yInt = scale - parseInt(y);
    const diameter = 0.6 * (0.4 * xInt + yInt) + 25;
    const luminosity = this.getStarLuminosity(yInt);
    const starClass = this.getStarClass(xInt, luminosity);
    const temperature = this.getStarTemperature(xInt, starClass);
    const mass = this.getStarMass(yInt);

    const props = {
      color,
      diameter,
      temperature,
      luminosity,
      starClass,
      mass,
    };

    return <StarView {...props}/>;
  }

  render() {
    return (
      <div className="App">
        <div className="diagram-container">
          <HRDiagram
            onDiagramClick={this.handleClick}
          />
        </div>
        <div className="star-container">
          {this.state.color && this.renderStar()}
        </div>
      </div>
    );
  }
};

export default App;
