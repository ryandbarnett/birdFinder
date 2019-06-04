import { isLoading, hasErrored, setSightings } from '../../actions';
import fetchData from '../../utils/fetchData.js';

const fetchSightings = (url) => {
  return async (dispatch) =>  {
    try {
      dispatch(isLoading(true));
      const sightings = await fetchData(url);
      dispatch(isLoading(false));
      dispatch(setSightings(sightings));
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  }
}

export default fetchSightings;