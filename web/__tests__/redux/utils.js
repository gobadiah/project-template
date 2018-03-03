const mockCreateActions = jest.fn(x => x);

jest.mock('redux-actions', () => ({
  createActions: mockCreateActions,
}));

describe('createActions', () => {
  it('should call redux-actions\'s createActions', () => {
    const { createActions } = require('~/redux/utils');
    const value = {
      c: 'd',
    };
    const result = createActions(value, 'auth');
    expect(result).toEqual(value);
    expect(mockCreateActions).toHaveBeenCalledTimes(1);
    expect(mockCreateActions).toHaveBeenCalledWith({
      web: {
        auth: value,
      },
    });
  });
});

test('a exists', () => {
  const { a } = require('~/redux/utils');
  expect(a).toEqual(1);
});
