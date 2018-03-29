import moment from 'moment';

import age from '../age';

describe('Utils', () => {
  describe('age', () => {
    it('should give the number of year given a birthday', () => {
      const birthday = moment('1986-02-11');
      const t = jest.fn((x, y) => y);
      expect(age(t, birthday).years).toBeGreaterThanOrEqual(32);
      expect(t.mock.calls[0][0]).toEqual('age');
      expect(t).toHaveBeenCalledTimes(1);
    });
  });
});
