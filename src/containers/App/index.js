import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import loading from '../../media/bird-loading.gif';
import fetchSightings from '../../thunks/fetchSightings/';
import PropTypes from 'prop-types';
import Form from '../Form';
import GoogleMap from '../GoogleMap';
import Header from '../../components/Header';
import NotFound from '../../components/NotFound';
import { Route, Switch } from 'react-router-dom';

class App extends Component {

  componentDidMount = () => {
    const url = 'https://ebird.org/ws2.0/data/obs/US-CO/recent';
    this.props.fetchSightings(url);
  }

  render() {
    const {isLoading, error} = this.props;
    const errorMsg = error && <div className='error'><h1>Error: {error}</h1></div>
    const loadingImg = isLoading && !error && <div className='loading-container'><h1>Loading...</h1><img src={loading} alt='map loading' /></div>
    const form = !isLoading && !error && <Route exact path='/' component={ Form } />;
    const map = !isLoading && !error && <Route exact path='/' component={ GoogleMap } />;
    return (
      <div className="App">
        <Header />
        {form}
        {map}
        {loadingImg}
        {errorMsg}
      </div>
    );
  }
}

App.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(App);