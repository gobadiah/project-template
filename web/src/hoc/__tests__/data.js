const mockRead = jest.fn(() => 'mockRead');
const mockReadHandler = jest.fn(() => mockRead);
jest.mock('../../utils', () => ({
  read: jest.fn(() => mockReadHandler),
}));

jest.mock('json-api-denormalizer', () => jest.fn());

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

const setup = ({ endpoint, multiple } = {}) => {
  const args = { hello: 'world' };
  const data = require('../data').default;
  const { read } = require('~/utils');
  const denormalizer = require('json-api-denormalizer');
  const query = {};
  const user = {
    type: 'users',
    id: 5,
  };
  const store = {
    getState: jest.fn(() => ({ api: {} })),
  };
  denormalizer.mockImplementation(() => ({
    users: {
      5: user,
    },
  }));
  const result = {
    body: {
      data: multiple ? [{ type: 'users', id: 5 }] : { type: 'users', id: 5 },
    },
  };
  return {
    args,
    data,
    denormalizer,
    endpoint,
    query,
    read,
    result,
    store,
    user,
  };
};

describe('Hoc', () => {
  describe('data', () => {
    it('should do nothing when there are no endpoint provided', () => {
      const {
        args,
        data,
        denormalizer,
        endpoint,
        query,
        read,
        store,
      } = setup();
      expect(data({
        endpoint,
        query,
        store,
        ...args,
      })).toBeUndefined();
      expect(read).not.toHaveBeenCalled();
      expect(denormalizer).not.toHaveBeenCalled();
    });

    it('should be called with some arguments, endpoint as a string, single result', async () => {
      const {
        args,
        data,
        endpoint,
        query,
        read,
        result,
        store,
        user,
      } = setup({ endpoint: 'endpoint' });
      expect(data({
        endpoint,
        query,
        store,
        ...args,
      })).toEqual('mockRead');

      expect(read).toHaveBeenCalledTimes(1);
      expect(read).toHaveBeenCalledWith({ query, store, ...args });

      expect(mockReadHandler).toHaveBeenCalledTimes(1);
      expect(mockReadHandler.mock.calls[0]).toHaveLength(1);
      const handler = mockReadHandler.mock.calls[0][0];
      const p = Promise.resolve(result);
      await expect(handler(p)).resolves.toEqual({
        user,
      });
      expect(mockRead).toHaveBeenCalledTimes(1);
      expect(mockRead).toHaveBeenCalledWith(endpoint);
    });

    it('should be called with some arguments, endpoint as a string, multiple results', async () => {
      const {
        args,
        data,
        endpoint,
        query,
        read,
        result,
        store,
        user,
      } = setup({ endpoint: 'endpoint', multiple: true });
      expect(data({
        endpoint,
        query,
        store,
        ...args,
      })).toEqual('mockRead');

      expect(read).toHaveBeenCalledTimes(1);
      expect(read).toHaveBeenCalledWith({ query, store, ...args });

      expect(mockReadHandler).toHaveBeenCalledTimes(1);
      expect(mockReadHandler.mock.calls[0]).toHaveLength(1);
      const handler = mockReadHandler.mock.calls[0][0];
      const p = Promise.resolve(result);
      await expect(handler(p)).resolves.toEqual({
        users: [user],
      });
      expect(mockRead).toHaveBeenCalledTimes(1);
      expect(mockRead).toHaveBeenCalledWith(endpoint);
    });

    it(
      'should be called with some arguments, endpoint as a function, multiple results',
      async () => {
        const {
          args,
          data,
          endpoint,
          query,
          read,
          result,
          store,
          user,
        } = setup({ endpoint: jest.fn(() => 'endpoint'), multiple: true });
        expect(data({
          endpoint,
          query,
          store,
          ...args,
        })).toEqual('mockRead');

        expect(read).toHaveBeenCalledTimes(1);
        expect(read).toHaveBeenCalledWith({ query, store, ...args });

        expect(mockReadHandler).toHaveBeenCalledTimes(1);
        expect(mockReadHandler.mock.calls[0]).toHaveLength(1);
        const handler = mockReadHandler.mock.calls[0][0];
        const p = Promise.resolve(result);
        await expect(handler(p)).resolves.toEqual({
          users: [user],
        });
        expect(mockRead).toHaveBeenCalledTimes(1);
        expect(mockRead).toHaveBeenCalledWith('endpoint');

        expect(endpoint).toHaveBeenCalledTimes(1);
        expect(endpoint).toHaveBeenCalledWith(query);
      },
    );
  });
});
