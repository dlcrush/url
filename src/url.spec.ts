import Url from './url';

describe('Url', () => {
  it('builds url with sets', () => {
    const url = new Url();

    url.setBaseUrl('https://bacon.com');
    url.setPath('/api/delicious');
    url.setQueryParams({
      test: '123',
      foo: 'bar',
    });

    const result = url.build();
    const expected = 'https://bacon.com/api/delicious?test=123&foo=bar';

    expect(result).toBe(expected);
  });

  // it('builds url with chain', () => {
  //     const result = new Url()
  //                     .baseUrl('https://bacon.com')
  //                     .path('/api/delicious')
  //                     .params({
  //                         test: '123',
  //                         foo: 'bar'
  //                     })
  //                     .build();

  //     const expected = 'https://bacon.com/api/delicious?test=123&foo=bar';

  //     expect(result).toBe(expected);
  // });

  it('builds url with arguments', () => {
    const result = new Url().build({
      baseUrl: 'https://bacon.com',
      path: '/api/delicious',
      queryParams: {
        test: '123',
        foo: 'bar',
      },
    });

    const expected = 'https://bacon.com/api/delicious?test=123&foo=bar';

    expect(result).toBe(expected);
  });

  it('gets and sets properties', () => {
    const url = new Url();

    const givenBaseUrl = 'https://bacon.com';
    url.setBaseUrl(givenBaseUrl);
    expect(url.getBaseUrl()).toBe(givenBaseUrl);

    const givenPath = '/api/delicious';
    url.setPath(givenPath);
    expect(url.getPath()).toBe(givenPath);

    const givenParams = {
      band: 'tool',
      maynard: 'keenan',
      album: 'lateralus',
    };
    url.setQueryParams(givenParams);
    expect(url.getQueryParams()).toStrictEqual(givenParams);
  });

  it('works with no query params', () => {
    const result = new Url().build({
      baseUrl: 'https://test.com',
      path: '/api/v1/bacon',
    });

    expect(result).toBe('https://test.com/api/v1/bacon');
  });

  it('works with empty input', () => {
    const result = new Url().build();

    expect(result).toBe('');
  });

  it('works with constructor', () => {
    const result = new Url({
      baseUrl: 'https://test.com',
      path: '/api/v1/foo',
      queryParams: {
        debug: 'true',
      },
    }).build();

    expect(result).toBe('https://test.com/api/v1/foo?debug=true');
  });

  it('parses url string to query params object', () => {
    const result = Url.parseQueryParams('https://test.com/api/v1/foo?debug=true&bacon=good');
    expect(result).toStrictEqual({
      debug: 'true',
      bacon: 'good',
    });
  });
});
