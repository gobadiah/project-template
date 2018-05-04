import * as comp from '..';

describe('Fields index', () => {
  it('should export a few components', () => {
    expect(comp).toHaveProperty('EmailField');
    expect(comp).toHaveProperty('PasswordField');
    expect(comp).toHaveProperty('FirstNameField');
    expect(comp).toHaveProperty('LastNameField');
    expect(comp).toHaveProperty('BirthdayField');
  });
});
