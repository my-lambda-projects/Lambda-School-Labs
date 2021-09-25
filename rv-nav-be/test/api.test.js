const request = require('supertest');

const server = require('../src/app.js');

describe('GET /', () => {
  it('db environment test || set to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  it('returns a 200 OK', () => {
    return request(server)
      .get('/')
      .expect(200);
  });

  it('Returns a json object', () => {
    return request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '25')
      .then(res => {
        expect(res.body).toStrictEqual({
          message: 'Hello World'
        });
      });
  });
});
