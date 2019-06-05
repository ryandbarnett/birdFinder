import key from './ebirdKey';

const fetchData = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      'x-ebirdapitoken': key,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) throw Error(response.statusText);
  return response.json();
};

export default fetchData;
