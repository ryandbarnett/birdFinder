import { EBIRD_API_KEY } from './apiKeys.js';

const fetchData = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      'x-ebirdapitoken': EBIRD_API_KEY
    }
  }
  const response = await fetch(url, options);
  !response.ok && throw Error(response.statusText);
  return await response.json();
}

export default fetchData;