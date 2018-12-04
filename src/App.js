import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h1>Biryani Locations, Hyderabad</h1>
        </div>
        <Map />
      </div>
    );
  }
}

export default App;
