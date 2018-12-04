import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';

const api_key = "AIzaSyCL1A0cRaE7FO0bNKY3U2rJSfws0Z9z4-Q";

export class MapContainer extends React.Component {
	render() {
		return(
			<Map google={this.props.google} zoom={14}>
        	</Map>
		)
		
	}
}


export default GoogleApiWrapper({
  apiKey: (`${api_key}`)
})(MapContainer)