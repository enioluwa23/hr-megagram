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
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderStar = this.renderStar.bind(this);
  }

  handleClick(data) {
    this.setState({ clickLocation: data.location, color: data.color });
  }

  renderStar() {
    const { color, clickLocation } = this.state;
    if (!color || !clickLocation) {
      return null;
    }
    const { x, y } = clickLocation;
    const xInt = parseInt(x);
    const yInt = 400 - parseInt(y);
    const diameter = xInt + yInt;
    const temperature = xInt;
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
        <HRDiagram
          onDiagramClick={this.handleClick}
        />
        {this.state.color && this.renderStar()}
      </div>
    );
  }
};

export default App;
