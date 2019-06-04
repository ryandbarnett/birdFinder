import React, { Component } from 'react';
import { names } from './data.js';

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

    if(names.includes(inputs.species)) {
      speciesCode = this.state.sightings.reduce((acc, sighting) => {
        const {comName, sciName} = sighting;
        if (comName === inputs.species || sciName === inputs.species) {
          acc = sighting.speciesCode;
        }
        return acc;
      }, '')
    }
    const options = {
      method: 'GET',
      headers: {
        'x-ebirdapitoken': EBIRD_API_KEY
      }
    }
    const baseUrl = 'https://ebird.org/ws2.0/data/obs/US-CO/recent/'
    const url = baseUrl + speciesCode + '?maxResults=200';
    
    const response = await fetch(url, options);
    const sightings = await response.json();
    this.setState({sightings})
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

export default Form;