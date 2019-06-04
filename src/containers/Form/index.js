import React, { Component } from 'react';
import { connect } from 'react-redux'
import fetchSightings from '../../thunks/fetchSightings/';
import { names } from '../../utils/data.js';
import { EBIRD_API_KEY } from '../../utils/apiKeys.js';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

class Form extends Component {
  handleSubmit = async (e) => {
    let speciesCode;
    e.preventDefault();
    const inputs = Array.from(e.target.elements).reduce((acc, element) => {
      if (element.name) {
        acc[element.name] = element.value.trim();
      }
      return acc;
    }, {});

    if (names.includes(inputs.species)) {
      speciesCode = this.state.sightings.reduce((acc, sighting) => {
        const {comName, sciName} = sighting;
        if (comName === inputs.species || sciName === inputs.species) {
          acc = sighting.speciesCode;
        }
        return acc;
      }, '')
    }
    const baseUrl = 'https://ebird.org/ws2.0/data/obs/US-CO/recent/'
    const url = baseUrl + speciesCode + '?maxResults=200';
    this.props.fetchSightings(url);
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput 
          name='species'
          Component='input' 
          placeholder='Species' 
          id='species-input' 
          matchAny={true} 
          trigger={''} 
          options={names} 
        />
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

export const mapDispatchToProps=(dispatch) => ({
  fetchSightings: (url) => {
    dispatch(fetchSightings(url))
  }
});

export default connect(null, mapDispatchToProps)(Form);