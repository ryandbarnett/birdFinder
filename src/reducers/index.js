import { combineReducers } from 'redux';
import sightings from './sightingsReducer/';

const rootReducer = combineReducers({
  sightings
})

export default rootReducer;