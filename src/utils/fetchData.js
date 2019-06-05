import EBIRD_API_KEY from './apiKeys';

const fetchData = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      'x-ebirdapitoken': EBIRD_API_KEY,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) throw Error(response.statusText);
  return response.json();
};

export default fetchData;
