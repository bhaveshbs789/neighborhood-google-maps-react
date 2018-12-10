import React, {Component} from 'react';
import './App.css';
import locations from './venues.json';
import MapDisplay from './Map';
// import * as FourSquareAPI from './FourSquareAPI'
import VenueListDrawer from './VenueList'

class App extends Component {
    state = {
        lat: 17.3850,
        lon: 78.4867,
        zoom: 13,
        venuesList: locations,
        drawerOpen: false,
        filteredList:[]
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

    componentDidMount() {
        this.setState({
            ...this.state,
            filteredList: this.filterVenues(this.state.venuesList,"")
        })
    }

    clickListItem = (index) => {
        this.setState({clickedItemIndex: index, drawerOpen: !this.state.drawerOpen})
    }

    updateQuery = (query) => {
        this.setState({
            ...this.state,
            clickedItemIndex: null,
            filteredList: this.filterVenues(this.state.venuesList, query)
        })
    }

    filterVenues = (locations,query) => {
        // let regex = new RegExp(query, "gi");
        // return locations.match(regex);
        return locations.filter((location) => location.name.toLowerCase().includes(query.toLowerCase()));
    }

    toggleDrawer = () => {
        this.setState({drawerOpen: !this.state.drawerOpen});
    }

    styles = {
        menuButton : {
            marginLeft: "10px",
            marginRight: "20px",
            position: "absolute",
            left: "10px",
            top: "15px",
            background:"#ffbf00",
            padding: "10px",
            color:"white",
            borderRadius:"10px",
            cursor:"pointer",
            border:"none",
            fontWeight: "bold"
        },
        hide : {
            display: "none"
        },
        header : {
            marginTop: "0px"
        }
    }

    render = () => {
        return (
          <div className="App">
            <div>
                <button onClick={this.toggleDrawer} style={this.styles.menuButton}>Check Out!!</button>
                <h2>Hyderabad Biryani Restaurants</h2>
            </div>
            <MapDisplay {...this.state}/>
            <VenueListDrawer locations={this.state.filteredList} 
                             open={this.state.drawerOpen} 
                             toggleDrawer={this.toggleDrawer}
                             filterVenues={this.updateQuery}
                             clickedListItem={this.clickListItem}/>
          </div>
        );
    }
}

export default App;
