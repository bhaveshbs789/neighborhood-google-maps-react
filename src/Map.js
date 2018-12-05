import React, { Component } from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

const api_key = "AIzaSyCL1A0cRaE7FO0bNKY3U2rJSfws0Z9z4-Q";

class MapContainer extends Component {
	
	state = {
			markers : [],
			map : null,
			showingInfoWindow: false,
			activeMarker:null,
			markerProps: [],
			currentMarkerProps : null
	}

	mapReady = (mapProps, map) => {
		this.setState({map: map});
		
		this.updateMarkers(this.props.allLocations);
	}

	closeInfoWindow = () => {
		this.state.activeMarker && this.state.activeMaker.setAnimation(null);
		this.setState({showingInfoWindow: false, activeMarker: null, currentMarkerProps: null});
	}

	onMarkerClick = (props, marker, event) => {
		this.closeInfoWindow();
		this.setState({activeMarker: marker, showingInfoWindow: true, currentMarkerProps: props})
	}

	updateMarkers = (venuesList) => {
		// debugger
		if(!venuesList) {
			return;
		}
		
		this.state.markers.forEach(marker => marker.setMap(null));

		let markerProps = [];
		let markers = venuesList.map((venue, index) => {
			let eachMarkerProp = {
				key: venue.id,
				index: index,
				name: venue.name,
				position: {lat: venue.location.lat, lng: venue.location.lng}
			}
			markerProps.push(eachMarkerProp);

			let markerAnimation = this.props.google.maps.Animation.DROP;
			let marker = new this.props.google.maps.Marker({
				position: {lat: venue.location.lat, lng: venue.location.lng},
				map: this.state.map,
				animation: markerAnimation
			});

			marker.addListener('click', () => {
				this.onMarkerClick(eachMarkerProp, marker, null)
			});
			return marker;
		})

		this.setState({markers, markerProps});
	}

	render() {

		const style = {
			width: "100%",
			height: "100%"
		}

		const center = {
			lat: this.props.center.lat,
			lng: this.props.center.lng
		}

		return (
			<Map
				role="application"
				aria-label="map"
				google={this.props.google}
				center={center}
				zoom={this.props.zoom}
				style={style}
				onReady={this.mapReady}
				onClick={this.closeInfoWindow}>
				<InfoWindow
	          		marker={this.state.activeMarker}
	          		visible={this.state.showingInfoWindow}
	          		onClose={this.closeInfoWindow}>
	          		<div>
	          			<h4>Hello</h4>
	          		</div>	           
        		</InfoWindow>
        	</Map>
		)
	}
}


export default GoogleApiWrapper({
  apiKey: (`${api_key}`)
})(MapContainer)