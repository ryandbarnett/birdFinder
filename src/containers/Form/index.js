import React, { Component } from 'react';
import { connect } from 'react-redux'
import fetchSightings from '../../thunks/fetchSightings/';
import birds from '../../utils/data.js';
import TextInput from 'react-autocomplete-input';
import PropTypes from 'prop-types';
import 'react-autocomplete-input/dist/bundle.css';

class Form extends Component {
  constructor() {
    super()
    this.state = {
      species: '',
      start: '',
      end: '',
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let { species } = this.state;
    species = species.trim();
    let speciesCode;
    if (Object.keys(birds).includes(species)) {
      speciesCode = birds[species].speciesCode;
    }

    const baseUrl = 'https://ebird.org/ws2.0/data/obs/US-CO/recent';
    const max = '100';
    const url = !speciesCode ? `${baseUrl}${max}` : `${baseUrl}/${speciesCode}?maxResults=${max}`;
    this.props.fetchSightings(url);
  }

  handleTextInputChange = (e) => {
    this.setState({species: e});
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }
  
  render() {
    const { handleSubmit, handleChange, handleTextInputChange } = this;
    const { species, start, end } = this.state;
    return (
      <form onSubmit={handleSubmit}>
        <label for="species">Species:</label>
        <TextInput 
          onChange={handleTextInputChange}
          name='species'
          Component='input' 
          placeholder='Species'
          value={species} 
          id='species' 
          matchAny={true}
          trigger={''} 
          options={Object.keys(birds)} 
        />
        <label for="region">Region:</label>
        <input id='region' type='text' name='region' placeholder='Region' />
        <label for="start">Start date:</label>
        <input id="start" type="date" name="start" onChange={handleChange} max={end} />
        <label for="end">End date:</label>
        <input id="end" type="date" name="end" onChange={handleChange} min={start} />
        <button type='submit'>Find</button>
      </form>
    );
  }
}

Form.propTypes = {
  sightings: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  fetchSightings: PropTypes.func
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