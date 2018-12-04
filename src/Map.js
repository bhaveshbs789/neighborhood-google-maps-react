import React, { Component } from 'react';
// import * as FourSquareAPI from './FourSquareAPI';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const api_key = "AIzaSyCL1A0cRaE7FO0bNKY3U2rJSfws0Z9z4-Q";

export class MapContainer extends Component {
	
	state = {
			markers : [],
			map : null,
			showingInfoWindow: false,
			locations: []
	}

	mapReady = (mapProps, map) => {
		this.setState({map: map})
	}

	componentDidMount() {
		
	}

	render() {
		console.log(this.props)

		const style = {
			width: "100%",
			height: "100%"
		}

		const center = {
			lat: this.props.center.lat,
			lng: this.props.center.lng
		}

		// console.log(`Value for center, ${center}`);
		return(
			<Map
				role="application"
				aria-label="map"
				google={this.props.google}
				center={center}
				zoom={this.props.zoom}
				style={style}
				onReady={this.mapReady}>
        	</Map>
		)
		
	}
}


export default GoogleApiWrapper({
  apiKey: (`${api_key}`)
})(MapContainer)