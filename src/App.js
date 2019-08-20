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
    this.getStarMass = this.getStarMass.bind(this);
    this.getStarLuminosity = this.getStarLuminosity.bind(this);
    this.getStarTemperature = this.getStarTemperature.bind(this);
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

  _getLuminosityClass(fractionY) {
    if (fractionY < 45/142) {
      return 'D';
    } else if (fractionY < 59/142) {
      return 'VI';
    } else if (fractionY < 73/142) {
      return 'V';
    } else if (fractionY < 83/142) {
      return 'IV';
    } else if (fractionY < 92/142) {
      return 'III';
    } else if (fractionY < 102/142) {
      return 'II';
    } else if (fractionY < 116/142) {
      return 'Ib';
    } else if (fractionY < 132/142) {
      return 'Ia';
    } else {
      return 'Ia-O';
    }
  }

  _getStarClass(fractionX, fractionY, cutoff, range) {
    const mkClass = Math.floor((fractionX - cutoff) * ((79 * 9)/range) + 1).toString();
    const lumClass = this._getLuminosityClass(fractionY);
    return mkClass + lumClass;
  }

  getStarClass(xLoc, yLoc) {
    const { scale } = this.state;
    const fractionX = xLoc / scale;
    const fractionY = yLoc / scale;

    if (fractionX < 18/79) {
      return 'O' + this._getStarClass(fractionX, fractionY, 0, 18);
    } else if (fractionX < 39/79) {
      return 'B' + this._getStarClass(fractionX, fractionY, 18/79, 21);
    } else if (fractionX < 46/79) {
      return 'A' + this._getStarClass(fractionX, fractionY, 39/79, 7);
    } else if (fractionX < 50/79) {
      return 'F' + this._getStarClass(fractionX, fractionY, 46/79, 4);
    } else if (fractionX < 58/79) {
      return 'G' + this._getStarClass(fractionX, fractionY, 50/79, 8);
    } else if (fractionX < 67/79) {
      return 'K' + this._getStarClass(fractionX, fractionY, 58/79, 9);
    } else {
      return 'M' + this._getStarClass(fractionX, fractionY, 67/79, 12);
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

  _getStarMass(fractionY, base, range, min, maxIncrease) {
    return min + ((fractionY - base) * (128/range) * maxIncrease);
  }

  getStarMass(yLoc) {
    const { scale } = this.state;
    const fractionY = yLoc / scale;
    if (fractionY < 30/128) {
      return this._getStarMass(fractionY, 0, 30, 0, 0.1).toFixed(1);
    } else if (fractionY < 40/128) {
      return this._getStarMass(fractionY, 30/128, 10, 0.1, 0.2).toFixed(1);
    } else if (fractionY < 56/128) {
      return this._getStarMass(fractionY, 40/128, 12, 0.3, 0.7).toFixed(1);
    } else if (fractionY < 64/128) {
      return this._getStarMass(fractionY, 56/128, 8, 1, 0.5).toFixed(1);
    } else if (fractionY < 79/128) {
      return this._getStarMass(fractionY, 64/128, 15, 1.5, 1.5).toFixed(1);
    } else if (fractionY < 89/128) {
      return this._getStarMass(fractionY, 79/128, 10, 3.0, 3.0).toFixed(1);
    } else if (fractionY < 100/128) {
      return this._getStarMass(fractionY, 89/128, 11, 6.0, 4.0).toFixed(1);
    } else if (fractionY < 117/128) {
      return this._getStarMass(fractionY, 100/128, 17, 10.0, 20.0).toFixed(1);
    } else if (fractionY < 122/128) {
      return this._getStarMass(fractionY, 117/128, 5, 30.0, 60.0).toFixed(1);
    } else {
      return this._getStarMass(fractionY, 122/128, 6, 60.0, 240.0).toFixed(1);
    }
  }

  getDescription(starClass) {
    const mkClass = starClass.charAt(0);
    const lumClass = starClass.slice(2);
    let description = '';
    switch (mkClass) {
    case 'O': description += 'Blue'; break;
    case 'B': description += 'Blue-White'; break;
    case 'A': description += 'White'; break;
    case 'F': description += 'Yellow-White'; break;
    case 'G': description += 'Yellow'; break;
    case 'K': description += 'Orange'; break;
    case 'M': description += 'Red'; break;
    default: break;
    }

    description += ' ';

    switch (lumClass) {
    case 'D':
    case 'VI': description += 'Subdwarf'; break;
    case 'V': description += 'Main-Sequence/Dwarf Star'; break;
    case 'IV': description += 'Subgiant Star'; break;
    case 'III': description += 'Giant Star'; break;
    case 'II': description += 'Bright Giant'; break;
    case 'Ib': description += 'Supergiant'; break;
    case 'Ia': description += 'Luminous Supergiant'; break;
    case 'Ia-O': description += 'Hypergiant'; break;
    default: break;
    }

    return description;
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
    const starClass = this.getStarClass(xInt, yInt);
    const temperature = this.getStarTemperature(xInt, starClass);
    const description = this.getDescription(starClass);
    const mass = parseFloat(this.getStarMass(yInt));

    const props = {
      color,
      description,
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
        <h1 className="title">HR Megagram</h1>
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
