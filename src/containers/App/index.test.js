import React from 'react'; 
import { shallow } from 'enzyme';
import { App } from '.';


describe('App', () => {
  const fetchSightings = jest.fn(); 
  it('should match the snapshot', () => { 
    const wrapper = shallow( <App fetchSightings={fetchSightings} />);

    expect(wrapper).toMatchSnapshot(); 
  }); 
});