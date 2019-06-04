import isLoading from './';

describe('isLoadingReducer', () => {
  it('should return the initial state', () => {
    const expected = false

    const result = isLoading(undefined, {})

    expect(result).toEqual(expected)
  });

  it('should return a boolean if the action type is IS_LOADING', () => {
    const expected = true
    const action = {
      type: 'IS_LOADING',
      isLoading: expected
    }

    const result = isLoading(undefined, action)

    expect(result).toEqual(expected)
  });
});