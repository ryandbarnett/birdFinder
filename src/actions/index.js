export const setSightings = sightings => ({
  type: 'SET_SIGHTINGS',
  sightings,
});

export const isLoading = bool => ({
  type: 'IS_LOADING',
  isLoading: bool,
});

export const hasErrored = message => ({
  type: 'HAS_ERRORED',
  message,
});
