import hasErrored from './';

describe('hasErroredReducer', () => {
  it('should return the initial state', () => {
    const expected = '';

    const result = hasErrored(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return an error message if the action type is HAS_ERRORED', () => {
    const expected = 'Error Message';
    const action = {
      type: 'HAS_ERRORED',
      message: expected
    };

    const result = hasErrored(undefined, action);

    expect(result).toEqual(expected);
  });
});