import React, {Component} from 'react';
import './App.css';
import locations from './venues.json';
import MapDisplay from './Map';
import * as FourSquareAPI from './FourSquareAPI'

class App extends Component {
  state = {
    lat: 17.3850,
    lon: 78.4867,
    zoom: 13,
    venuesList: locations,
    locale : "hyderabad, IN",
    query:"biryani",
    limit: 10    
  }
  

  // For some reason when retrieving the venues list via FourSquare API
  // the markers dont render !! and works when hardcoded :(
  // hence created the venues json file
  // componentDidMount() {
  //   FourSquareAPI.searchVenue({
  //       near: "hyderabad, IN",
  //       query:"biryani",
  //       limit:10
  //   }).then((results) => {
  //       const {venues} = results.response;
  //       const {center} = results.response.geocode.feature.geometry;

  //       const markers = venues.map((venue) => {
  //           return {
  //               lat: venue.location.lat,
  //               lng: venue.location.lng
  //           }
  //       })

  //       this.setState({venues, center, markers})
  //   })
  // }

  render = () => {
    return (
      <div className="App">
        <div>
          <h2>Hyderabad Biryani Restaurants</h2>
        </div>
        <MapDisplay {...this.state} />
        
      </div>
    );
  }
}

export default App;