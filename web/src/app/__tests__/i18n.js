import request from 'supertest';

import createApp from '~/app';

let server;

beforeAll(() => createApp(false).then((value) => {
  server = value.listen(0);
  jest.setTimeout(15000);
}));

afterAll(() => {
  server.close();
});

const testServer = (message, get, status, text, set = ['Accept', 'text/html']) => {
  it(message, () => request(server)
    .get(get)
    .set(...set)
    .expect(status)
    .expect(text));
};

describe('App', () => {
  testServer(
    'should return english when specifying lng query parameter',
    '/?lng=en',
    200,
    />Hello world !<\/div>/,
  );

  testServer(
    'should return english when specifying Accept-Language header',
    '/',
    200,
    />Hello world !<\/div>/,
    ['Accept-Language', 'en'],
  );

  testServer(
    'should return english when specifying i18next cookie',
    '/',
    200,
    />Hello world !<\/div>/,
    ['Cookie', 'i18next=en'],
  );

  testServer(
    'should prioritize query over header',
    '/?lng=fr',
    200,
    />Salut le monde !<\/div>/,
    ['Accept-Language', 'en'],
  );
});
