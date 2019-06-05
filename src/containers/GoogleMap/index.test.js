import React from 'react'; 
import { shallow } from 'enzyme';
import { GoogleMap } from '.';


describe('GoogleMap', () => { 
  it('should match the snapshot', () => { 
    const wrapper = shallow( <GoogleMap />);

    expect(wrapper).toMatchSnapshot(); 
  }); 
});