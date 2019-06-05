import * as actions from '.';

describe('actions', () => {
  it('should have a type of SET_SIGHTINGS', () => {
    const sightings = ['bird1', 'bird2'];
    const expectedAction = {
      type: 'SET_SIGHTINGS',
      sightings,
    };

    const result = actions.setSightings(sightings);

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of IS_LOADING', () => {
    const bool = true;
    const expectedAction = {
      type: 'IS_LOADING',
      isLoading: bool,
    };

    const result = actions.isLoading(bool);

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of HAS_ERRORED', () => {
    const message = 'Error Message';
    const expectedAction = {
      type: 'HAS_ERRORED',
      message,
    };

    const result = actions.hasErrored(message);

    expect(result).toEqual(expectedAction);
  });
});
