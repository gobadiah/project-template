import { formatError, formatWarning } from '..';

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
