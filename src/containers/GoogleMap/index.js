import React, { Component } from 'react';
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react';
import birds from '../../utils/data';
import key from '../../utils/mapKey';
import './Map.css';
import { Route, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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
        labelContent: "<i class='fa fa-dove fa-lg'></i>",
        labelStyle: {color: '#' + birds[comName].iconColor, opacity: 1},
        labelClass: "labels",
        title: comName + ' (' + sciName + ')',
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
      <div className='Map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key }}
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

GoogleMap.propTypes = {
  sightings: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
}

export const mapStateToProps = (state) => ({ 
  sightings: state.sightings,
  isLoading: state.isLoading,
  error: state.error,
});

export default connect(mapStateToProps)(GoogleMap);
