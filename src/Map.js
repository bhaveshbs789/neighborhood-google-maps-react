import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import * as FourSquareAPI from './FourSquareAPI'
import img from './dish.png'
import errorDisplay from './ErrorDisplay'

const MAP_KEY = "AIzaSyCL1A0cRaE7FO0bNKY3U2rJSfws0Z9z4-Q";

class MapDisplay extends Component {
    state = {
    	points : [],
        map: null,
        markers: [],
        markerProps: [],
        clickedMarker: null,
        clickedMarkerProperties: null,
        showingInfoWindow: false,
    };

//    componentDidUpdate() {
//        
//    }

    componentWillReceiveProps(props){
    	if(props.filteredList.length !== this.state.markers.length){
    		this.closeInfoWindow();
    		if(props.filteredList.length === 0){
    			return;
    		}
    		this.updateMarkers(props.filteredList);
    		this.setState({clickedMarker: null});
            return;
    	}
        
        if (!props.clickedItemIndex || (this.state.clickedMarker && (this.state.markers[props.clickedItemIndex] !== this.state.clickedMarker))) {
            this.closeInfoWindow();
        }
        
        if (props.clickedItemIndex === null || typeof(props.clickedItemIndex) === "undefined") {
            return;
        };
        
        this.onMarkerClick(this.state.markerProps[props.clickedItemIndex], this.state.markers[props.clickedItemIndex]);
    }

//    static getDerivedStateFromProps(nextProps, prevState) {
//        if(prevState.markers.length !== nextProps.filteredList.length){
//            return {
//                closeInfoWindow();
//                updateMarkers(filteredList)
//            }
//        }
//    }

    mapReady = (props, map) => {
        this.setState({map});
        // this.updateMarkers(this.props.venuesList);
        this.updateMarkers(this.props.filteredList);
    }

    updateMarkers = (locations) => {
        // If all the locations have been filtered then we're done
        if (!locations) 
            return;
        
        // For any existing markers remove them from the map
        this.state.markers.forEach(marker => marker.setMap(null));
        
        // Add the markers to the map along the way.
     	let markerProperties = [];
    	let points = [];

    	let markers = locations.map((venue, index) => {

    		let oneMarkerProps = {
    			key : venue.id,
    			index: index,
    			name: venue.name,
    			address: venue.location.formattedAddress[0]
    		}
    		//console.log(oneMarkerProps);
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
    	    });

    	this.setState({markers: markers, markerProps: markerProperties, points:points})
    }


    closeInfoWindow = () => {
        this.state.clickedMarker && this
            .state
            .clickedMarker
            .setAnimation(null);
//        if(this.props.clickedItemIndex === null || this.props.clickedItemIndex === "undefined") {
//            this.setState({showingInfoWindow: false, clickedMarker: null, clickedMarkerProperties: null});
//        }
        this.setState({showingInfoWindow: false, clickedMarker: null, clickedMarkerProperties: null});       
            
    }

    onMarkerClick = (props, marker, e) => {
        this.closeInfoWindow();

        FourSquareAPI.getVenueDetails(props.key)
        .then(res => {
        	//console.log(res.response);
        	let activeMarkerProps;
        	if(res.response) {
        		activeMarkerProps = {
        			...props,
        			url: res.response.venue.shortUrl
        		}
        	}
        	

        	if(activeMarkerProps.url) {
        		FourSquareAPI.getVenuePhoto(props.key)
        		.then(res => {
        			//console.log(res)
        			if(res.response.photos.count > 0) {
        				activeMarkerProps = {
        					...activeMarkerProps,
        					images : res.response.photos
        				}
        			}

        			if(this.state.clickedMarker) {
        				this.state.clickedMarker.setAnimation(null);
        			}

        			marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
        			this.setState({showingInfoWindow: true, clickedMarker: marker, clickedMarkerProperties: activeMarkerProps})
        		})
        	} else {
        		marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
        		this.setState({showingInfoWindow: true, clickedMarker: marker, clickedMarkerProperties: activeMarkerProps})
        	}
        })
    }

    
    render = () => {
    	// console.log(this.props);
        const style = {
            width: '100%',
            height: '100%',
            elementType: 'geometry', 
            stylers: [{color: '#242f3e'}]
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
                        {amProps && amProps.images
                            ? (
                            	<div>
                                <img src={amProps.images.items[0].prefix + "150x150" + amProps.images.items[0].suffix}
                                	 alt={amProps.name}/>
                                </div>
                            )
                            : ""}
                        {amProps && amProps.address
                            ? (
                                <p>{amProps.address}</p>
                            )
                            : ""}
                        {amProps && amProps.url
                            ? (
                                <a href={amProps.url}>Visit Website</a>
                            )
                            : ""}
                        </div>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({apiKey: MAP_KEY,
								LoadingContainer: errorDisplay})(MapDisplay)
