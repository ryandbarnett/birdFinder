import { setSightings } from '../../actions'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { EBIRD_API_KEY } from '../../utils/apiKeys.js';

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     sightings: []
  //   }
  // }

  componentDidMount = async () => {
    const options = {
      method: 'GET',
      headers: {
        'x-ebirdapitoken': EBIRD_API_KEY
      }
    }
    const url = 'https://ebird.org/ws2.0/data/obs/US-CO/recent'

    const response = await fetch(url, options);
    const sightings = await response.json();
    // this.setState({sightings})
    this.props.setSightings(sightings);
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
  sightings: state.sightings 
})

export const mapDispatchToProps=(dispatch) => {
  return {
    setSightings: (sightings) => {
      dispatch(setSightings(sightings))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);