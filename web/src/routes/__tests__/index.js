describe('Routes', () => {
  it('should add a number of routes', () => {
    const mockRoutes = { Router: {} };
    const mockRoutesAdd = jest.fn(() => mockRoutes);
    mockRoutes.add = mockRoutesAdd;
    jest.mock('next-routes', () => () => mockRoutes);

    const mockStart = jest.fn();
    const mockDone = jest.fn();
    jest.mock('nprogress', () => ({
      start: mockStart,
      done: mockDone,
    }));

    require('~/routes');

    expect(mockRoutesAdd).toHaveBeenCalledTimes(5);
    expect(mockRoutesAdd).toBeCalledWith('index', '/', 'index_');
    expect(mockRoutesAdd).toBeCalledWith('some-page');
    expect(mockRoutesAdd).toBeCalledWith('generate-error');
    expect(mockRoutesAdd).toBeCalledWith('signin');
    expect(mockRoutesAdd).toBeCalledWith('register');

    mockRoutes.Router.onRouteChangeStart();
    expect(mockStart).toHaveBeenCalledTimes(1);

    mockRoutes.Router.onRouteChangeComplete();
    expect(mockDone).toHaveBeenCalledTimes(1);

    mockRoutes.Router.onRouteChangeError();
    expect(mockDone).toHaveBeenCalledTimes(2);

    jest.dontMock('next-routes');
    jest.dontMock('nprogress');
    jest.resetModules();
  });
});
