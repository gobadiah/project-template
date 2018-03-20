import 'jsdom-global/register';

import React from 'react';
import { shallow } from 'enzyme';

import { SubmissionError } from 'redux-form';

import {
  formatError,
  formatWarning,
  handleFormErrors,
  BaseForm,
} from '..';

describe('formatError', () => {
  it('should format a string given the t function', () => {
    const t = jest.fn(x => x);
    const error = 'This is an error';
    expect(formatError(error, t)).toBe(error);
    expect(t).toHaveBeenCalledTimes(1);
    expect(t).toHaveBeenCalledWith(error);
  });

  it('should format an error of string given the t function', () => {
    const t = jest.fn(x => x);
    const error = ['one error', 'two error'];
    expect(formatError(error, t)).toEqual([
      error[0],
      error[1],
    ]);
    expect(t).toHaveBeenCalledTimes(2);
    expect(t).toHaveBeenCalledWith(error[0]);
    expect(t).toHaveBeenCalledWith(error[1]);
  });
});

describe('formatWarning', () => {
  it('should format a string given the t function', () => {
    const t = jest.fn(x => x);
    const error = 'This is an error';
    expect(formatWarning(error, t)).toBe(error);
    expect(t).toHaveBeenCalledTimes(1);
    expect(t).toHaveBeenCalledWith(error);
  });

  it('should format an error of string given the t function', () => {
    const t = jest.fn(x => x);
    const error = ['one error', 'two error'];
    expect(formatWarning(error, t)).toEqual([
      error[0],
      error[1],
    ]);
    expect(t).toHaveBeenCalledTimes(2);
    expect(t).toHaveBeenCalledWith(error[0]);
    expect(t).toHaveBeenCalledWith(error[1]);
  });
});

describe('handleFormErrors', () => {
  it('should rethrow if the error doesn\'t match the conditions', () => {
    const error = new Error();
    expect(() => handleFormErrors(error)).toThrowError(error);
  });

  it('should throw a SubmissionError if conditions match', () => {
    const error = {
      response: {
        status: 400,
        data: {
          non_field_errors: [
            'This is a global error',
          ],
          errors: {
            email: 'This is an email error',
          },
        },
      },
    };
    expect(() => handleFormErrors(error)).toThrow(SubmissionError);
  });
});

describe('BaseForm', () => {
  it('should be subclass and render an empty form', () => {
    const error = ['This is an error'];
    const warning = ['This is a warning'];
    const formatErr = err => `<error>${err}</error>`;
    const formatWarn = warn => `<warning>${warn}</warning>`;
    const handleSubmit = jest.fn();
    const pristine = false;
    const submitting = false;
    const reset = jest.fn();
    const t = x => x;
    const i18n = {
      on: jest.fn(),
    };

    const wrapper = shallow(<BaseForm
      error={error}
      warning={warning}
      formatError={formatErr}
      formatWarning={formatWarn}
      handleSubmit={handleSubmit}
      pristine={pristine}
      submitting={submitting}
      reset={reset}
    />, { context: { i18n, t } });
    expect(wrapper).toMatchSnapshot();
  });
});
