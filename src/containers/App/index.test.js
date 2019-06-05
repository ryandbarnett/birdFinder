import React from 'react'; 
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from '.';
import fetchSightings from '../../thunks/fetchSightings';

jest.mock('../../thunks/fetchSightings');

describe('App', () => {
  let wrapper;
  const fetchSightings = jest.fn(); 
  it('should match the snapshot', () => { 
    wrapper = shallow( <App fetchSightings={fetchSightings} />);

    expect(wrapper).toMatchSnapshot(); 
  });

  it('should have match snapshot if isLoading is true', () => { const
    wrapper = shallow( <App fetchSightings={fetchSightings} isLoading={true} />);

    expect(wrapper).toMatchSnapshot(); 
  });

  it('should have match snapshot if there is an error', () => { const
    wrapper = shallow( <App fetchSightings={fetchSightings} error={'Error'} />);

    expect(wrapper).toMatchSnapshot(); 
  });

  describe('mapStateToProps', () => {
    it('should return an object with error, sightings, and isLoading', () => {
      const mockState = {
        sightings: ['bird1', 'bird2'],
        error: '',
        isLoading: false,
        kitties: 'Meow meow',
      };
      const expected = {
        sightings: ['bird1', 'bird2'],
        error: '',
        isLoading: false,
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch with a fetchSightings action when componentDidMount is called', () => {
      const mockDispatch = jest.fn();
      const mockUrl = 'https://testUrl.com';
      const actionToDispatch = fetchSightings(mockUrl);

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchSightings(mockUrl)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });
  });
});