import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import fetchSightings from '../../thunks/fetchSightings/';
import PropTypes from 'prop-types';

class App extends Component {

  componentDidMount = () => {
    const url = 'https://ebird.org/ws2.0/data/obs/US-CO/recent'
    this.props.fetchSightings(url);
  }

  render() {
    return (
      <div className="App">
        <h1>Hello!</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);