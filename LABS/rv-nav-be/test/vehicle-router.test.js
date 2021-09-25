const request = require('supertest');
const db = require('../database/dbconfig');
const server = require('../src/app');
describe('VEHICLES ROUTER SUITE', () => {
  beforeEach(async () => {
    await db('users').truncate();
    await db('vehicle').truncate();
  });
  describe('POST /', () => {
    it('returns a 401 Unauthorized when no token is provided in headers', () => {
      return request(server)
        .post('/vehicle')
        .send({ name: 'Happy Trails', user_id: 1 })
        .expect(401);
    });
    it('returns a 201 Created when a valid token is provided in headers', async () => {
      await request(server)
        .post('/users/register')
        .send({
          username: 'samwise',
          first_name: 'sam',
          last_name: 'gamgi',
          password: 'password123',
          email: 'samwise2019@sample.com'
        });
      const userObj = await request(server)
        .post('/users/login')
        .send({
          username: 'samwise',
          password: 'password123'
        });
      return request(server)
        .post('/vehicle')
        .set('Authorization', userObj.body.token)
        .send({ name: 'Happy Trails', user_id: 1 })
        .expect(201);
    });
  });
  describe('GET /', () => {
    it('returns a 401 Unauthorized when no token is provided in headers', () => {
      return request(server)
        .get('/vehicle')
        .expect(401);
    });
    it('returns a 200 OK when a valid token is passed in headers', async () => {
      await request(server)
        .post('/users/register')
        .send({
          username: 'samwise',
          first_name: 'sam',
          last_name: 'gamgi',
          password: 'password123',
          email: 'samwise2019@sample.com'
        });
      const userObj = await request(server)
        .post('/users/login')
        .send({
          username: 'samwise',
          password: 'password123'
        });
      await request(server)
        .post('/vehicle')
        .set('Authorization', userObj.body.token)
        .send({ name: 'Happy Trails', user_id: 1 })
        .expect(201);
      return request(server)
        .get('/vehicle')
        .set('Authorization', userObj.body.token)
        .expect(200);
    });
  });
  describe('GET /:id', () => {
    it('returns a 401 Unauthorized when no token is provided in headers', () => {
      return request(server)
        .get('/vehicle/1')
        .expect(401);
    });
    it('returns a 200 OK when a valid token is passed in headers', async () => {
      await request(server)
        .post('/users/register')
        .send({
          username: 'samwise',
          first_name: 'sam',
          last_name: 'gamgi',
          password: 'password123',
          email: 'samwise2019@sample.com'
        });
      const userObj = await request(server)
        .post('/users/login')
        .send({
          username: 'samwise',
          password: 'password123'
        });
      await request(server)
        .post('/vehicle')
        .set('Authorization', userObj.body.token)
        .send({ name: 'Happy Trails', user_id: 1 })
        .expect(201);
      return request(server)
        .get('/vehicle/1')
        .set('Authorization', userObj.body.token)
        .expect(200);
    });
  });
  describe('PUT /:id', () => {
    it('returns a 401 Unauthorized when no token is provided in headers', async () => {
      return request(server)
        .put('/vehicle/1')
        .send({ name: 'Happy Trails', user_id: 1 })
        .expect(401);
    });
    it('returns a 200 OK when a valid token is provided in headers', async () => {
      await request(server)
        .post('/users/register')
        .send({
          username: 'samwise',
          first_name: 'sam',
          last_name: 'gamgi',
          password: 'password123',
          email: 'samwise2019@sample.com'
        });
      const userObj = await request(server)
        .post('/users/login')
        .send({
          username: 'samwise',
          password: 'password123'
        });
      await request(server)
        .post('/vehicle')
        .set('Authorization', userObj.body.token)
        .send({ name: 'Happy Trails', user_id: 1 })
        .expect(201);
      return request(server)
        .put('/vehicle/1')
        .set('Authorization', userObj.body.token)
        .send({ name: 'Happy Trails 2', user_id: 1 })
        .expect(200);
    });
    it('correctly updates the entry passed in the query params', async () => {
      await request(server)
        .post('/users/register')
        .send({
          username: 'samwise',
          first_name: 'sam',
          last_name: 'gamgi',
          password: 'password123',
          email: 'samwise2019@sample.com'
        });
      const userObj = await request(server)
        .post('/users/login')
        .send({
          username: 'samwise',
          password: 'password123'
        });
      await request(server)
        .post('/vehicle')
        .set('Authorization', userObj.body.token)
        .send({ name: 'Happy Trails', user_id: 1 })
        .expect(201);
      let updatedVehicle = await request(server)
        .put('/vehicle/1')
        .set('Authorization', userObj.body.token)
        .send({ name: 'Uno', user_id: 1 })
        .expect(200, '1');
      expect(updatedVehicle.text).toBe('1');
      let vehicle = await request(server)
        .get('/vehicle/1')
        .set('Authorization', userObj.body.token)
        .expect(200);
      expect(vehicle.body.name).toBe('Uno');
      updatedVehicle = await request(server)
        .put('/vehicle/1')
        .set('Authorization', userObj.body.token)
        .send({ name: 'Unos', user_id: 1 })
        .expect(200, '1');
      vehicle = await request(server)
        .get('/vehicle/1')
        .set('Authorization', userObj.body.token)
        .expect(200);
      expect(vehicle.body.name).toBe('Unos');
    });
  });
  describe('DELETE /:id', () => {
    it('returns a 401 Unauthorized when no token is provided in headers', async () => {
      return request(server)
        .del('/vehicle/1')
        .expect(401);
    });
    it('returns a 200 OK when a valid token is provided in headers', async () => {
      await request(server)
        .post('/users/register')
        .send({
          username: 'samwise',
          first_name: 'sam',
          last_name: 'gamgi',
          password: 'password123',
          email: 'samwise2019@sample.com'
        });
      const userObj = await request(server)
        .post('/users/login')
        .send({
          username: 'samwise',
          password: 'password123'
        });
      await request(server)
        .post('/vehicle')
        .set('Authorization', userObj.body.token)
        .send({ name: 'Happy Trails', user_id: 1 })
        .expect(201);
      await request(server)
        .post('/vehicle')
        .set('Authorization', userObj.body.token)
        .send({ name: 'Mini Soda', user_id: 1 })
        .expect(201);
      return request(server)
        .del('/vehicle/1')
        .set('Authorization', userObj.body.token)
        .expect(200);
    });
  });
});
