/* eslint-disable no-console */
import React from 'react';
import './App.css';
import HRDiagram from './components/HRDiagram';

export const App = () => {
  const handleColorChange = ({ hex }) => console.log(hex);

  return (
    <div className="App">
      <HRDiagram
        color={{ h: 200,
          s: 0.50,
          l: 0.20,
          a: 1 }}
        onChangeComplete={ handleColorChange }
      />
    </div>
  );
};

export default App;
