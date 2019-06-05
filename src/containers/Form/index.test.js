import React from 'react'; 
import { shallow } from 'enzyme';
import { Form } from '.';


describe('Form', () => {
  const fetchSightings = jest.fn(); 
  it('should match the snapshot', () => { 
    const wrapper = shallow( <Form fetchSightings={fetchSightings} />);

    expect(wrapper).toMatchSnapshot(); 
  }); 
});