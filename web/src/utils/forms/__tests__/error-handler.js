beforeEach(() => {
  jest.resetModules();
});

describe('errorHandler', () => {
  it('should re-throw if response status is not 400', () => {
    const err = new Error('Hello');
    const errorHandler = require('../error-handler').default;
    expect(() => errorHandler(err)).toThrow(err);
  });

  it('should throw a SubmissionError is status is 400', () => {
    jest.mock('redux-form', () => ({
      SubmissionError: jest.fn(),
    }));
    const { SubmissionError } = require('redux-form');
    const errorHandler = require('../error-handler').default;
    const err = {
      response: {
        status: 400,
        data: {
          _error: ['Global error'],
          email: ['Email error'],
        },
      },
    };
    expect(() => errorHandler(err)).toThrow(SubmissionError);
  });
});
