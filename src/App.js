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

  getStarClass(xLoc) {
    const { scale } = this.state;
    const fraction = xLoc / scale;

    if (fraction < 18/79) {
      const harvardClassName = 'O';
      const mkClassName = Math.floor(fraction * ((79 * 9)/18) + 1).toString();
      const lumClassName = 'V'; // (for now)
      return harvardClassName + mkClassName + lumClassName;
    } else if (fraction < 39/79) {
      const harvardClassName = 'B';
      const mkClassName = Math.floor((fraction - 18/79) * ((79 * 9)/21) + 1).toString();
      const lumClassName = 'V'; // (for now)
      return harvardClassName + mkClassName + lumClassName;
    } else if (fraction < 46/79) {
      const harvardClassName = 'A';
      const mkClassName = Math.floor((fraction - 39/79) * ((79 * 9)/7) + 1).toString();
      const lumClassName = 'V'; // (for now)
      return harvardClassName + mkClassName + lumClassName;
    } else if (fraction < 50/79) {
      const harvardClassName = 'F';
      const mkClassName = Math.floor((fraction - 46/79) * ((79 * 9)/4) + 1).toString();
      const lumClassName = 'V'; // (for now)
      return harvardClassName + mkClassName + lumClassName;
    } else if (fraction < 58/79) {
      const harvardClassName = 'G';
      const mkClassName = Math.floor((fraction - 50/79) * ((79 * 9)/8) + 1).toString();
      const lumClassName = 'V'; // (for now)
      return harvardClassName + mkClassName + lumClassName;
    } else if (fraction < 67/79) {
      const harvardClassName = 'K';
      const mkClassName = Math.floor((fraction - 58/79) * ((79 * 9)/9) + 1).toString();
      const lumClassName = 'V'; // (for now)
      return harvardClassName + mkClassName + lumClassName;
    } else {
      const harvardClassName = 'M';
      const mkClassName = Math.floor((fraction - 67/79) * ((79 * 9)/12) + 1).toString();
      const lumClassName = 'V'; // (for now)
      return harvardClassName + mkClassName + lumClassName;
    }
  }

  getStarTemperature(xLoc, starClass) {
    const { scale } = this.state;
    const xPos = scale - xLoc;

    if (starClass.startsWith('O')) {
      const base = 61/79 * scale;
      const range = 18/79 * scale;
      const offset = xPos - base;
      const increase = 22000 * (offset / range);
      return Math.round(28000 + increase);
    } else if (starClass.startsWith('B')) {
      const base = 40/79 * scale;
      const range = 21/79 * scale;
      const offset = xPos - base;
      const increase = 18000 * (offset / range);
      return Math.round(10000 + increase);
    } else if (starClass.startsWith('A')) {
      const base = 33/79 * scale;
      const range = 7/79 * scale;
      const offset = xPos - base;
      const increase = 2500 * (offset / range);
      return Math.round(7500 + increase);
    } else if (starClass.startsWith('F')) {
      const base = 29/79 * scale;
      const range = 4/79 * scale;
      const offset = xPos - base;
      const increase = 1500 * (offset / range);
      return Math.round(6000 + increase);
    } else if (starClass.startsWith('G')) {
      const base = 21/79 * scale;
      const range = 8/79 * scale;
      const offset = xPos - base;
      const increase = 1000 * (offset / range);
      return Math.round(5000 + increase);
    } else if (starClass.startsWith('K')) {
      const base = 12/79 * scale;
      const range = 9/79 * scale;
      const offset = xPos - base;
      const increase = 1500 * (offset / range);
      return Math.round(3500 + increase);
    } else if (starClass.startsWith('M')) {
      const range = 12/79 * scale;
      const offset = xPos;
      const increase = 2200 * (offset / range);
      return Math.round(1300 + increase);
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
    const starClass = this.getStarClass(xInt);
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
