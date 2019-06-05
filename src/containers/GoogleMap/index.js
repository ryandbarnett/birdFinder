import React, { Component } from 'react';
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react';
import birds from '../../utils/data.js';

class GoogleMap extends Component {
  constructor() {
    super()
    this.state = {
      map: {},
      maps: {},
      mapLoading: true,
      markers: []
    }
  }

  static defaultProps = {
    center: {
      lat: 39.73,
      lng: -104.99
    },
    zoom: 8
  };

  componentDidUpdate = () => {
    const {sightings} = this.props;
    const {mapLoading, markers} = this.state;
    if (!mapLoading && sightings && sightings.length !== markers.length) {
      this.deleteMarkers();
      const newMarkers = this.createNewMarkers(sightings);
      this.setState({markers: newMarkers});
    }
  }

  createNewMarkers = (sightings) => {
    const {map, maps} = this.state;
    var MarkerWithLabel = require('markerwithlabel')(maps);
    return sightings.map(sighting => {
      const {lat, lng, comName, sciName} = sighting;
      const position = {lat, lng};
      return new MarkerWithLabel({
        position,
        map,
        icon: ' ',
        labelContent: '<i class="fa fa-dove fa-lg"></i>',
        labelStyle: {color: '#' + birds[comName].iconColor, opacity: 1},
        labelClass: "labels",
        title: comName + ' (' + sciName + ')'
      });
    });
  }

  setMapOnAll = (map) => {
    const {markers} = this.state;
    markers.forEach(marker => {
      marker.setMap(map);
    });
  }

  deleteMarkers = () => {
    this.clearMarkers();
    this.setState({markers: []});
  }

  clearMarkers = () => {
    this.setMapOnAll(null);
  }

  handleApiLoaded = (api) => {
    const {map, maps} = api;
    this.setState({map, maps, mapLoading: false});
  }

  render = () => {
    const zoom = 8; 
    const center = {lat: 39.73, lng: -104.99};

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD-jihDZWqhhM5u_7sEIIWuyoX_3YshsAg' }}
          defaultCenter={center}
          defaultZoom={zoom}
          onGoogleApiLoaded={(api) => this.handleApiLoaded(api)}
          yesIWantToUseGoogleMapApiInternals
        >
        </GoogleMapReact>
      </div>
    ); 
  }
}

export const mapStateToProps = (state) => ({ 
  sightings: state.sightings,
  isLoading: state.isLoading,
  error: state.error
});

export const mapDispatchToProps=(dispatch) => ({
  fetchSightings: (url) => {
    dispatch(fetchSightings(url))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);
