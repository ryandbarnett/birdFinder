const sightings = (state=[], action) => {
  switch (action.type) {
    case 'SET_SIGHTINGS':
      return action.sightings
    default:
      return state
  }
}

export default sightings;