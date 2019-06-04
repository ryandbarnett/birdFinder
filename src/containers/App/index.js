import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { EBIRD_API_KEY } from '../../utils/apiKeys.js';
import fetchSightings from '../../thunks/fetchSightings/';

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
})

export const mapDispatchToProps=(dispatch) => {
  return {
    fetchSightings: (url) => {
      dispatch(fetchSightings(url))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);