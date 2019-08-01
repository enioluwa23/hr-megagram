/* eslint-disable no-console */
import React from 'react';
import './App.css';
import HRDiagram from './components/HRDiagram';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clickLocation: null,
      color: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(data) {
    this.setState({ clickLocation: data.location, color: data.color });
  }

  render() {
    return (
      <div className="App">
        <HRDiagram
          onDiagramClick={this.handleClick}
        />
        <div width="300" height="300" style={{ backgroundColor: 'teal' }}>
          {this.state.clickLocation &&
          <p>{`x=${this.state.clickLocation.x} y=${this.state.clickLocation.y}`}</p>}
          <p>{this.state.color}</p>
        </div>
      </div>
    );
  }
};

export default App;
