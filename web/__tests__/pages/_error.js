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

describe('Error', () => {
  it('should be shallow-renderable', () => {
    const ErrorPage = require('~/pages/_error').default;
    const wrapper = shallow(<ErrorPage />);
    expect(wrapper.contains(<div>An error occured</div>)).toBe(true);
  });

  it('should record error to raven on server with dsn available', () => {
    jest.mock('../../src/config', () => ({ dev: false, sentry: { DSN: true } }));
    const ErrorPage = require('~/pages/_error').default;
    const err = new Error('test');
    const req = true;
    const result = ErrorPage.getInitialProps({ req, err });
    expect(result).toEqual({});
    const Raven = getRaven();
    expect(Raven.captureException).toHaveBeenCalled();
    expect(Raven.captureException.mock.calls[0]).toEqual([err]);
  });

  it('should not record an error on server with dsn not available', () => {
    jest.mock('../../src/config', () => ({ dev: false, sentry: { DSN: false } }));
    const ErrorPage = require('~/pages/_error').default;
    const err = new Error('test');
    const req = true;
    const result = ErrorPage.getInitialProps({ req, err });
    expect(result).toEqual({});
    const Raven = getRaven();
    expect(Raven.captureException).not.toHaveBeenCalled();
  });

  it('should not do anything on client', () => {
    jest.mock('../../src/config', () => ({ dev: false, sentry: { DSN: true } }));
    const ErrorPage = require('~/pages/_error').default;
    const err = new Error('test');
    const req = undefined;
    const result = ErrorPage.getInitialProps({ req, err });
    expect(result).toEqual({});
    const Raven = getRaven();
    expect(Raven.captureException).not.toHaveBeenCalled();
  });

  it('should not do anything in dev mode', () => {
    jest.mock('../../src/config', () => ({ dev: true, sentry: { DSN: true } }));
    const ErrorPage = require('~/pages/_error').default;
    const err = new Error('test');
    const req = true;
    const result = ErrorPage.getInitialProps({ req, err });
    expect(result).toEqual({});
    const Raven = getRaven();
    expect(Raven.captureException).not.toHaveBeenCalled();
  });
});
