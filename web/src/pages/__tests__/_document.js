import React from 'react';

import { shallow } from 'enzyme';

import Document from '~/pages/_document';

jest.mock('emotion-server', () => ({
  extractCritical: jest.fn(() => ({ value: 'extractCriticalResponse' })),
}));

// eslint-disable-next-line import/first
import { extractCritical } from 'emotion-server';

describe('Document', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Document />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be shallow-renderable and record ids when available', () => {
    const nextData = {};
    const ids = { a: 2 };
    shallow(<Document __NEXT_DATA__={nextData} ids={ids} />);
    expect(nextData).toEqual({
      ids,
    });
  });

  it('should be shallow-renderable and do nothing when ids is not available', () => {
    const nextData = {};
    shallow(<Document __NEXT_DATA__={nextData} />);
    expect(nextData).toEqual({
    });
  });

  it('has a getInitialProps', () => {
    const arg = {
      renderPage: () => ({
        html: 'extractCritical',
      }),
    };
    const result = Document.getInitialProps(arg);
    expect(result).toEqual({
      html: 'extractCritical',
      value: 'extractCriticalResponse',
    });
    expect(extractCritical).toHaveBeenCalled();
    expect(extractCritical.mock.calls[0]).toEqual(['extractCritical']);
  });
});
