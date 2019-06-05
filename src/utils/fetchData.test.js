import fetchData from './fetchData';
import key from './ebirdKey';

describe('fetchData', () => {
  let mockUrl;
  let mockResponse;

  beforeEach(() => {
    mockUrl = 'https://ebird.org/ws2.0/data/obs/US-CO/recent';
    mockResponse = ['bird1', 'bird2'];

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    }));
  });

  it('should be called with correct params', () => {
    const expected = [
      mockUrl,
      {
        method: 'GET',
        headers: {
          'x-ebirdapitoken': key,
        },
      },
    ];

    fetchData(mockUrl);

    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });

  it('should return a parsed response if status is ok', async () => {
    const result = await fetchData(mockUrl);

    expect(result).toEqual(mockResponse);
  });

  it('should return an error if status is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Error Message',
    }));

    await expect(fetchData()).rejects.toEqual(Error('Error Message'));
  });
});
