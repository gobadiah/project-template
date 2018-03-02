import request from 'supertest';

import createApp from '~/app';

let server;

beforeAll(() => createApp(false).then((value) => { server = value.listen(0); }));

afterAll(() => { server.close(); });

describe('App', () => {
  it('should return english when specifying lng query parameter', () =>
    request(server)
      .get('/?lng=en')
      .expect(200)
      .expect(/>Hello world !<\/div>/));

  it('should return english when specifying Accept-Language header', () =>
    request(server)
      .get('/')
      .set('Accept-Language', 'en')
      .expect(200)
      .expect(/>Hello world !<\/div>/));

  it('should return english when specifying i18next cookie', () =>
    request(server)
      .get('/')
      .set('Cookie', 'i18next=en')
      .expect(200)
      .expect(/>Hello world !<\/div>/));

  it('should prioritize query over header', () =>
    request(server)
      .get('/?lng=fr')
      .set('Accept-Language', 'en')
      .expect(200)
      .expect(/>Salut le monde !<\/div>/));
});
