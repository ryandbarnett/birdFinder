import React from 'react'; 
import { shallow } from 'enzyme';
import { App } from '.';


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
});