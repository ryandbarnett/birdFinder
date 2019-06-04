import sightings from './';

describe('sightingsReducer', () => {
  it('should return the initial state', () => {
    const expected = []

    const result = sightings(undefined, {})

    expect(result).toEqual(expected)
  });

  it('should return a sightings array is the action type is SET_SIGHTINGS', () => {
    const expected = ['bird1', 'bird2']
    const action = {
      type: 'SET_SIGHTINGS',
      sightings: expected
    }

    const result = sightings(undefined, action)

    expect(result).toEqual(expected)
  });
});