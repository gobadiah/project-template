/* eslint-disable import/first, global-require */

import React from 'react';

import { shallow } from 'enzyme';

const mockCaptureException = jest.fn();

jest.mock('../../src/config/raven', () => () => ({
  captureException: mockCaptureException,
}));

import getRaven from '~/config/raven';

beforeEach(() => {
  mockCaptureException.mockClear();
  jest.dontMock('../../src/config');
  jest.resetModules();
});

const setup = (dev, DSN, req) => {
  const mockDev = dev;
  const mockDSN = DSN;
  jest.mock('../../src/config', () => ({ dev: mockDev, sentry: { DSN: mockDSN } }));
  const ErrorPage = require('~/pages/_error').default;
  const err = new Error('test');
  const result = ErrorPage.getInitialProps({ req, err });
  expect(result).toEqual({});
  const Raven = getRaven();
  return {
    dev,
    DSN,
    req,
    err,
    Raven,
  };
};

describe('Error', () => {
  it('should be shallow-renderable', () => {
    const ErrorPage = require('~/pages/_error').default;
    const wrapper = shallow(<ErrorPage />);
    expect(wrapper.contains(<div>An error occured</div>)).toBe(true);
  });

  it('should record error to raven on server with dsn available', () => {
    const { Raven, err } = setup(false, true, true);
    expect(Raven.captureException).toHaveBeenCalled();
    expect(Raven.captureException.mock.calls[0]).toEqual([err]);
  });

  it('should not record an error on server with dsn not available', () => {
    const { Raven } = setup(false, false, true);
    expect(Raven.captureException).not.toHaveBeenCalled();
  });

  it('should not do anything on client', () => {
    const { Raven } = setup(false, true, undefined);
    expect(Raven.captureException).not.toHaveBeenCalled();
  });

  it('should not do anything in dev mode', () => {
    const { Raven } = setup(true, true, true);
    expect(Raven.captureException).not.toHaveBeenCalled();
  });
});
