import { combineReducers } from 'redux';
import sightings from './sightingsReducer';
import hasErrored from './hasErroredReducer';
import isLoading from './isLoadingReducer';

const rootReducer = combineReducers({
  sightings,
  isLoading,
  error: hasErrored,
});

export default rootReducer;
