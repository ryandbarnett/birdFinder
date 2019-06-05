import React, { Component } from 'react';
import { connect } from 'react-redux'
import fetchSightings from '../../thunks/fetchSightings/';
import birds from '../../utils/data.js';
import TextInput from 'react-autocomplete-input';
import PropTypes from 'prop-types';
import 'react-autocomplete-input/dist/bundle.css';
import './Form.css';

export class Form extends Component {
  constructor() {
    super()
    this.state = {
      species: '',
      region: '',
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
      <form className='Form' onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor="species">Species</label>
          <TextInput 
            onChange={handleTextInputChange}
            name='species'
            Component='input' 
            value={species} 
            id='species' 
            matchAny={true}
            trigger={''} 
            options={Object.keys(birds)} 
          />
        </div>
        <div className='input-container'>
          <label htmlFor="region">Region</label>
          <input id='region' type='text' name='region' onChange={handleChange} />
        </div>
        <div className='input-container'>
          <label htmlFor="start">Start date</label>
          <input id="start" type="date" name="start" onChange={handleChange} max={end} />
        </div>
        <div className='input-container'>
          <label htmlFor="end">End date</label>
          <input id="end" type="date" name="end" onChange={handleChange} min={start} />
        </div>
        <div className='checkboxes-container'>
          <div className='checkbox-container'>
            <label htmlFor="recent">Show Recent:</label>
            <input id="recent" type="checkbox" name="recent" />
          </div>
          <div className='checkbox-container'>
            <label htmlFor="notable">Show Notable:</label>
            <input id="notable" type="checkbox" name="notable" />
          </div>
        </div>
        <div className='submit-btn-container'>
          <button id='submit-btn' type='submit'>Find</button>
        </div>
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