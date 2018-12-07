import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

const MAP_KEY = "AIzaSyCL1A0cRaE7FO0bNKY3U2rJSfws0Z9z4-Q";

class MapDisplay extends Component {
    state = {
        map: null,
        markers: [],
        markerProps: [],
        clickedMarker: null,
        clickedMarkerProperties: null,
        showingInfoWindow: false
    };

    mapReady = (props, map) => {
        this.setState({map});
        this.updateMarkers(this.props.locations);
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

    updateMarkers = (locations) => {
        // no locations ? we are done then !!
        if (!locations) {
            return;
        }
        
        // setMap for existing marker on map to null
        this.state.markers.forEach(marker => marker.setMap(null));

        // add markers to map
        let markerProps = [];
        let markers = locations.map((location, index) => {
            let mProps = {
                key: index,
                index,
                name: location.name,
                position: {lat: location.location.lat, lng: location.location.lng}
            };
            markerProps.push(mProps);

            let animation = this.props.google.maps.Animation.DROP;
            let marker = new this.props.google.maps.Marker({
                position: {lat: location.location.lat, lng: location.location.lng}, 
                map: this.state.map, 
                animation
            });
            marker.addListener('click', () => {
                this.onMarkerClick(mProps, marker, null);
            });
            return marker;
        })

        this.setState({markers, markerProps});
    }

    render = () => {
        const style = {
            width: '100%',
            height: '100%'
        }
        const center = {
            lat: this.props.lat,
            lng: this.props.lon
        }
        let amProps = this.state.clickedMarkerProperties;

        return (
            <Map
                role="application"
                aria-label="map"
                onReady={this.mapReady}
                google={this.props.google}
                zoom={this.props.zoom}
                style={style}
                initialCenter={center}
                onClick={this.closeInfoWindow}>
                <InfoWindow
                    marker={this.state.clickedMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.closeInfoWindow}>
                    <div>
                        <h3>{amProps && amProps.name}</h3>
                        {amProps && amProps.url
                            ? (
                                <a href={amProps.url}>See website</a>
                            )
                            : ""}
                        
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MapDisplay)