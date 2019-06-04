import fetchSightings from './';
import { isLoading, hasErrored, setSightings } from '../../actions';
import fetchData from '../../utils/fetchData.js';

jest.mock('../../utils/fetchData.js');
fetchData.mockImplementation(() => mockSightings);

describe('fetchSightings', () => {
  let mockUrl;
  let mockSightings;
  let mockDispatch;
  
  beforeEach(() => {
    mockUrl = 'www.someurl.com';
    mockSightings = [
      {comName: 'Sparrow'}, 
      {comName: 'Falcon'}
    ];
    mockDispatch = jest.fn();
  });
  
  it('calls dispatch with isLoading(true)', () => {
    const thunk = fetchSightings(mockUrl);
    
    thunk(mockDispatch);
    
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true));
  });
  
  it('calls fetch with the correct param', () => {
    const thunk = fetchSightings(mockUrl);

    thunk(mockDispatch);

    expect(fetchData).toHaveBeenCalledWith(mockUrl);
  });

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    fetchData.mockImplementation(() => Promise.reject({message: 'Error Message'}));
    
    const thunk = fetchSightings(mockUrl);
    
    await thunk(mockDispatch);
    
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Error Message'));
  });

  it('should dispatch isLoading(false) if the response is ok', async () => {
    fetchData.mockImplementation(() => mockSightings);
    const thunk = fetchSightings(mockUrl);
    
    await thunk(mockDispatch);
    
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false));
  });
});