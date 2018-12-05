import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Map from './Map'
import * as FourSquareAPI from './FourSquareAPI'

class App extends Component {

  state = {
    venues : [],
    markers : [],
    center : [],
    zoom : 13

  }

  componentDidMount(){
    FourSquareAPI.searchVenue({
        near: "Hyderabad, IN",
        query: "biryani",
        limit: 10
      }).then(results => {
        console.log(results)
        const { venues } = results.response;
        const { center } = results.response.geocode.feature.geometry;

        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng
          }
        })

        this.setState({venues, center, markers})
      })


  }
  
  render() {
    return (
      <div className="App">
        <div>
          <h1>Biryani Locations, Hyderabad</h1>
        </div>
        <Map {...this.state}/>
      </div>
    );
  }
}

export default App;
