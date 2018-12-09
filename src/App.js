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
  // componentWillMount() {
  //   FourSquareAPI.searchVenue({
  //       near: "hyderabad, IN",
  //       query:"biryani",
  //       limit:10
  //   }).then((results) => {
  //       console.log(results)
  //       const {venues} = results.response;
  //       this.setState({venuesList: venues})
  //   })
  // }

 render = () => {
    return (
      <div className="App">
        <div>
          <h2>Hyderabad Biryani Restaurants</h2>
        </div>
        <MapDisplay {...this.state}/>
        
      </div>
    );
  }
}

export default App;