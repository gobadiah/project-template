import { fromJS } from 'immutable';

export default {
  dispatch: jest.fn(),
  getState: jest.fn(() => ({
    auth: fromJS({ userId: 1 }),
    api: {
      users: {
        data: {
          1: {
            type: 'users',
            id: 1,
            attributes: {
              name: 'JFK',
            },
          },
        },
      },
    },
  })),
};

export const user = {
  type: 'users',
  id: 1,
  name: 'JFK',
};
