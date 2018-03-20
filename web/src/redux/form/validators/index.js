export const required = value => (value ? undefined : 'Required');

export const minLength = length => value => ((typeof value === 'string' && value.length >= length) ?
  undefined : ['Must be a string of a minimal length', { length }]);
