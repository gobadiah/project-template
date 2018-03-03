import React from 'react';
import { shallow } from 'enzyme';

const mockCapture = jest.fn();
jest.mock('../../sentry', () => ({
  capture: mockCapture,
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe('Error', () => {
  it('should be shallow-renderable', () => {
    const ErrorPage = require('~/pages/_error').default;
    const wrapper = shallow(<ErrorPage />);
    expect(wrapper.contains(<div>An error occured</div>)).toBe(true);
  });

  describe('getInitialProps', () => {
    const setup = (req) => {
      const ErrorPage = require('~/pages/_error').default;
      const err = new Error();
      expect(ErrorPage.getInitialProps({ err, req })).toEqual({});
      return { err };
    };

    it('should capture when on server', () => {
      const { err } = setup(true);
      expect(mockCapture).toHaveBeenCalledTimes(1);
      expect(mockCapture).toHaveBeenCalledWith(err);
    });

    it('should not capture when on client', () => {
      setup();
      expect(mockCapture).not.toHaveBeenCalled();
    });
  });
});
