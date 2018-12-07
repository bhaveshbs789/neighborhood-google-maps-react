import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import * as FourSquareAPI from './FourSquareAPI'
import img from './restaurant.png'

const MAP_KEY = "AIzaSyCL1A0cRaE7FO0bNKY3U2rJSfws0Z9z4-Q";

class MapDisplay extends Component {
    state = {
    	center : [],
    	bounds : [],
    	points : [],
        map: null,
        markers: [],
        markerProps: [],
        clickedMarker: null,
        clickedMarkerProperties: null,
        showingInfoWindow: false,
    };

    mapReady = (props, map) => {
        this.setState({map});
        // this.updateMarkers(this.props.locations);

        FourSquareAPI.searchVenue({
        	near: "hyderabad, IN",
        	query: "biryani",
        	limit: 10
        }).then((results) => {
        	console.log(results)
        	let markerProperties = [];
        	let points = [];

        	let markers = results.response.venues.map((venue, index) => {

        		let oneMarkerProps = {
        			key : index,
        			index: venue.id,
        			name: venue.name,
        			address: venue.location.formattedAddress[0]
        		}

        		markerProperties.push(oneMarkerProps);

        		let onePoint = {
        			lat: venue.location.lat,
        			lng: venue.location.lng
        		}

        		points.push(onePoint);

        		let marker = new this.props.google.maps.Marker({
        			position: {lat: venue.location.lat, lng: venue.location.lng},
        			map: this.state.map,
        			icon : img,
        			animation: this.props.google.maps.Animation.DROP
        		});
        		marker.addListener('click', () => {
                	this.onMarkerClick(oneMarkerProps, marker, null);
            	});
        		return marker;
        	})

        	const { center } = results.response.geocode.feature.geometry;
        	const { bounds } = results.response.geocode.feature.geometry;
        	this.setState({markers: markers, markerProps: markerProperties, center: center, bounds: bounds, points:points})
        })
    }

    closeInfoWindow = () => {
        this.state.clickedMarker && this
            .state
            .clickedMarker
            .setAnimation(null);
        this.setState({showingInfoWindow: false, clickedMarker: null, clickedMarkerProperties: null});
    }

    onMarkerClick = (props, marker, e) => {
        this.closeInfoWindow();
        this.setState({showingInfoWindow: true, clickedMarker: marker, clickedMarkerProperties: props});
    }

    
    render = () => {
        const style = {
            width: '100%',
            height: '100%'
        }
        const center = {
            lat: this.state.center.lat,
            lng: this.state.center.lng
        }

        let amProps = this.state.clickedMarkerProperties;

        var bounds = new this.props.google.maps.LatLngBounds();

        for (var i = 0; i < this.state.points.length; i++) {
  			bounds.extend(this.state.points[i]);
		}

        return (
            <Map
                role="application"
                aria-label="map"
                onReady={this.mapReady}
                google={this.props.google}
                style={style}
                bounds={bounds}
                onClick={this.closeInfoWindow}>
                <InfoWindow
                    marker={this.state.clickedMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.closeInfoWindow}>
                    <div>
                        <h4>{amProps && amProps.name}</h4>
                        <div>
                        {amProps && amProps.address
                            ? (
                                <p>{amProps.address}</p>
                            )
                            : ""}
                        </div>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MapDisplay)