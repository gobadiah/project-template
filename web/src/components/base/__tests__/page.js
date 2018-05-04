import React from 'react';

import { shallow } from 'enzyme';

import Page from '../page';

describe('Page component', () => {
  it('should generate a child context', () => {
    const i18n = {};
    const t = jest.fn();
    const user = {};
    const setAxiosConfig = jest.fn();
    const wrapper = shallow(<Page i18n={i18n} t={t} user={user} setAxiosConfig={setAxiosConfig} />);
    expect(wrapper.instance().getChildContext()).toEqual({
      i18n,
      t,
      user,
    });
    expect(setAxiosConfig).toHaveBeenCalled();
  });
});
