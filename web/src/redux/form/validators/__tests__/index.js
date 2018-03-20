import {
  minLength,
  required,
} from '..';

describe('Validators', () => {
  describe('required', () => {
    it('should return undefined if value is defined', () => {
      expect(required(1)).toBeUndefined();
    });
    it('should return a string if value is undefined', () => {
      expect(typeof required(undefined)).toEqual('string');
    });
  });

  describe('minLength', () => {
    it('should return an array if value is not a string', () => {
      expect(Array.isArray(minLength(8)(['u']))).toBe(true);
    });

    it('should return an array if value is a string too short', () => {
      expect(Array.isArray(minLength(8)('azertyu'))).toBe(true);
    });

    it('should return undefined for a string of the right length', () => {
      expect(minLength(9)('azertyuio')).toBeUndefined();
    });
  });
});
