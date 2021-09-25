const request = require('supertest');
const app = require('../server');

describe('Test auth', () => {
  test('It should register user', async () => {
    const response = await request(app).post('/auth/register')
      .send({ username: 'test', password: 'password' });
    expect(response.statusCode).toBe(200);
  });
  test('It should login a user', async () => {
    const response = await request(app).post('/auth/login')
      .send({ username: 'test', password: 'password' });
    expect(response.statusCode).toBe(200);
  });
});
