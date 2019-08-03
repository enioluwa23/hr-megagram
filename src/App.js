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

  renderStar() {
    const { color, clickLocation, scale } = this.state;
    if (!color || !clickLocation) {
      return null;
    }

    /**
     * Let class determine temperature and wthin that class do calc
     * Get class (starting point, length) for O, B, A, F, G, K, M
     */

    const { x, y } = clickLocation;
    const xInt = scale - parseInt(x);
    const yInt = scale - parseInt(y);
    const diameter = 0.5 * (xInt + 2 * yInt) + 50;
    const temperature = 1000 + Math.pow(xInt, 1.5);
    const luminosity = yInt;
    const starClass = 'O';
    const mass = 1000;

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
        <div className="diagram-container ">
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
