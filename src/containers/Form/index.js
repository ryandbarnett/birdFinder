import React, { Component } from 'react';
import { connect } from 'react-redux'
import fetchSightings from '../../thunks/fetchSightings/';
import { names } from '../../utils/data.js';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

class Form extends Component {
  constructor() {
    super()
    this.state = {
      species: {
        value: ''
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let { value } = this.state.species;
    value = value.trim();
    let speciesCode;
    if (names.includes(value)) {
      speciesCode = this.props.sightings.find(sighting => {
        const {comName, sciName} = sighting;
        return comName === value || sciName === value;
      }).speciesCode;
    }

    const baseUrl = 'https://ebird.org/ws2.0/data/obs/US-CO/recent';
    const max = '100';
    const url = !speciesCode ? `${baseUrl}${max}` : `${baseUrl}/${speciesCode}?maxResults=${max}`;
    this.props.fetchSightings(url);
  }

  handleChange = (e) => {
    this.setState({species: {value: e}});
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput 
          onChange={this.handleChange}
          name='species'
          Component='input' 
          placeholder='Species'
          value={this.state.species.value} 
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

export default connect(mapStateToProps, mapDispatchToProps)(Form);