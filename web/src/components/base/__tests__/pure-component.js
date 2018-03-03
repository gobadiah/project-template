import React from 'react';

import { shallow } from 'enzyme';

import { PureComponent } from '..';

describe('PureComponent', () => {
  it('should subscribe to i18n language changes', () => {
    const context = {
      i18n: {
        on: jest.fn(),
      },
      t: jest.fn(),
    };
    PureComponent.prototype.forceUpdate = jest.fn();
    shallow(<PureComponent />, { context });
    expect(context.i18n.on.mock.calls).toHaveLength(1);
    const args = context.i18n.on.mock.calls[0];
    expect(args[0]).toEqual('languageChanged');
    expect(typeof args[1]).toBe('function');
    args[1]();
    expect(PureComponent.prototype.forceUpdate).toBeCalled();
  });
});
