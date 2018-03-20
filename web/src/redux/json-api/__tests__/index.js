import config from '~/config';

const t = v => expect(v).toBeDefined();

describe('Redux', () => {
  describe('json-api', () => {
    describe('index', () => {
      it('should export everything from next and auth', () => {
        const {
          handleUnauthorized,
          setupApi,
          getMe,
          signin,
          register,
        } = require('..');
        t(handleUnauthorized);
        t(setupApi);
        t(getMe);
        t(signin);
        t(register);
      });

      it('should export extraDispatchProps which provide for some usual props', () => {
        const mockSetAxiosConfig = jest.fn(x => x);
        const mockCreateResource = jest.fn(x => x);
        const mockUpdateResource = jest.fn(x => x);
        jest.doMock('redux-json-api', () => ({
          setAxiosConfig: mockSetAxiosConfig,
          createResource: mockCreateResource,
          updateResource: mockUpdateResource,
          reducer: jest.fn(),
        }));
        const mockSignin = jest.fn(x => x);
        const mockRegister = jest.fn(x => x);
        jest.doMock('../auth', () => ({
          signin: mockSignin,
          register: mockRegister,
        }));

        jest.resetModules();

        const { extraDispatchProps } = require('..');

        const dispatch = jest.fn(x => x);
        const data = {};
        const props = extraDispatchProps(dispatch);

        expect(props.setAxiosConfig()).toEqual(config.axios());
        expect(mockSetAxiosConfig).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(props.create(data)).toBe(data);
        expect(mockCreateResource).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(props.update(data)).toBe(data);
        expect(mockUpdateResource).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(props.signin(data)).toBe(data);
        expect(mockSignin).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(4);

        expect(props.register(data)).toBe(data);
        expect(mockRegister).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(5);
      });
    });
  });
});
