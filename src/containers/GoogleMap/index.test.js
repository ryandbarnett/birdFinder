import React from 'react'; 
import { shallow } from 'enzyme';
import { GoogleMap, mapStateToProps } from '.';


describe('GoogleMap', () => { 
  it('should match the snapshot', () => { 
    const wrapper = shallow( <GoogleMap />);

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
});