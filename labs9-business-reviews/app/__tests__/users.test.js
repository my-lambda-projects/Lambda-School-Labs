const server = require('../index.js');
const request = require('supertest');
const db = require('../db/dbinit');

describe('GET test', () => {
  test('should return a status code of 200', async () => {
    const response = await request(server).get('/api/user');
    expect(response.status).toBe(200);
  });

  test('should return a defined object', async () => {
    const response = await request(server).get('/api/user');
    expect(response.body).toBeDefined();
  });

  test('should return a status message of OK', async () => {
    const response = await request(server).get('/api/user');
    expect(response.res.statusMessage).toBe('OK');
  });
});

describe('GET BY ID test', () => {
  let singleUserId;

  const user = {
    name: 'james',
    email: 'jamestsest@james.com',
    password: 'james'
  };
  beforeEach(async () => {
    const response = await request(server)
      .post('/api/user/register')
      .send(user);
    const { id } = response.body;
    singleUserId = id;
  });

  afterEach(async () => {
    await db('users')
      .where({ id: singleUserId })
      .del();
  });

  test('should be returning a defined user object', async () => {
    const response = await request(server).get(`/api/user/${singleUserId}`);
    expect(response.body).toBeDefined();
  });
});

describe('Post test', () => {
  let singleUserId;

  const user = {
    name: 'jamess',
    email: 'jamesswtest@james.com',
    password: 'james'
  };

  afterEach(async () => {
    await db('users')
      .where({ id: singleUserId })
      .del();
  });

  test('should be a status of OK', async () => {
    const response = await request(server)
      .post(`/api/user/register`)
      .send(user);
    const { id } = response.body;
    singleUserId = id;
    expect(response.statusCode).toBe(200);
  });
});
