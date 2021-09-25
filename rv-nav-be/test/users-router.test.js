const request = require('supertest');

const server = require('../src/app');

describe('POST /', () => {
  it('returns a 500 when missing credentials', () => {
    return request(server)
      .post('/users/register')
      .send({
        username: 'ron',
        first_name: 'ron',
        last_name: 'kerr',
        email: 'ron@test.com'
      })
      .expect(500);
  });
  it('returns a 201 when all credentials are available', () => {
    return request(server)
      .post('/users/register')
      .send({ username: 'ron',
            first_name: 'ron',
            last_name: 'kerr',
            password: 'test',
            email: 'ron@test.com' })
      .expect(201);
  });
});

describe('POST /', () => {
    it('returns a 500 when missing credentials', () => {
      return request(server)
        .post('/users/login')
        .send({
          username: 'ron'  
        })
        .expect(500);
    });
    it('returns a 200 when all credentials are available', () => {
      return request(server)
        .post('/users/login')
        .send({ username: 'ron',
                password: 'test' })
        .expect(200);
    });
  });
