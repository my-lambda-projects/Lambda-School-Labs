const server = require('../server.js');

const db = require('../../database/db-config.js');

const request = require('supertest');

describe('server', function () {
  it('should set environment to testing', function () {
    expect(process.env.DB_ENV).toBe('testing');
  });
});

describe.skip('staff routes', () => {
  beforeEach(async () => {
    await db('staff').del();
    await db('user').del();
  });

  //valid request body
  const requestBody1 = {
    password: 'staff_test_3001',
    email: 'staff3001@gmail.com',
    name: 'Merry Teacher1',
    cpr: 86763583101,
    mobile_number: 4906578658,
    accent: 'Jamaican',
    gender: 'M',
    teaching_rate: 7.8,
    admin: false,
    active: true,
  };

  const requestBody2 = {
    password: 'staff_test_3002',
    email: 'staff3002@gmail.com',
    name: 'Merry Teacher2',
    cpr: 86763583102,
    mobile_number: 4906578658,
    accent: 'Canadian',
    gender: 'F',
    teaching_rate: 7.8,
    admin: false,
    active: true,
  };

  //malformed request body
  const malformedRequestBody = {
    password: 'staff_test_3003',
    email: 'staff3003@gmail.com',
    name: '',
    cpr: 86763583103,
    mobile_number: 4906578658,
    accent: 'Canadian',
    gender: 'F',
    teaching_rate: 7.8,
    admin: false,
    active: true,
  };

  //edited request body
  const requestBody3 = {
    password: 'staff_test_3001',
    email: 'staff3001@gmail.com',
    name: 'Gloomy Instructor',
    cpr: 86763583101,
    mobile_number: 4906578658,
    accent: 'Jamaican',
    gender: 'M',
    teaching_rate: 7.8,
    admin: false,
    active: true,
  };

  describe('GET /staff', () => {
    it('Should return a 200 status and array.', () => {
      return request(server)
        .get('/staff')
        .then(res => {
          expect(res.status).toEqual(200);
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.type).toMatch(/json/i);
        });
    });
  });

  describe('POST /staff', () => {
    it('Should create a user staff id, expected body, and a 201 created status.', async () => {
      return request(server)
        .post('/staff')
        .send(requestBody1)
        .then(res => {
          expect(res.body.id);
          expect(res.status).toEqual(201);
          expect(res.body.accent).toBe('Jamaican');
        });
    });

    it('Should return a 400 error.', async () => {
      return request(server)
        .post('/staff')
        .send(malformedRequestBody)
        .then(res => {
          expect(res.status).toEqual(400);
        });
    });

    it('Should return 401 status.', async () => {
      return request(server)
        .post('/staff')
        .send(requestBody1)
        .then(res => {
          return request(server)
            .post('/staff')
            .send(requestBody2)
            .then(resp => {
              expect(resp.status).toEqual(401);
            });
        });
    });
  });

  describe('GET /staff/:staffID', () => {
    it("Should return a 200 status and json data including 'name: Merry Teacher1'.", () => {
      return request(server)
        .post('/staff')
        .send(requestBody1)
        .then(res => {
          return request(server)
            .get(`/staff/${res.body.staff_id}`)
            .then(resp => {
              expect(resp.status).toEqual(200);
              expect(resp.type).toMatch(/json/i);
              expect(resp.body.name).toBe('Merry Teacher1');
            });
        });
    });
  });

  describe('PUT /staff/:staffID', () => {
    it("Should return a 200 status and json data including 'name: Gloomy Instructor'.", () => {
      return request(server)
        .post('/staff')
        .send(requestBody1)
        .then(res => {
          return request(server)
            .put(`/staff/${res.body.staff_id}`)
            .send(requestBody3)
            .then(resp => {
              expect(resp.status).toEqual(201);
              expect(resp.type).toMatch(/json/i);
              expect(resp.body.name).toBe('Gloomy Instructor');
            });
        });
    });
  });

  describe('DELETE /staff/:staffID', () => {
    it("Should return a 200 status and message 'staff deleted'.", () => {
      return request(server)
        .post('/staff')
        .send(requestBody1)
        .then(res => {
          return request(server)
            .del(`/staff/${res.body.staff_id}`)
            .then(resp => {
              expect(resp.status).toEqual(200);
              expect(resp.body.message).toBe('Staff Deleted');
            });
        });
    });
  });

  describe('GET /staff/:staffID/courses', () => {
    it('Should return a 404 not found status (there are no courses for this ID).', () => {
      return request(server)
        .post('/staff')
        .send(requestBody1)
        .then(res => {
          return request(server)
            .get(`/staff/${res.body.staff_id}/courses`)
            .then(resp => {
              expect(resp.status).toEqual(200);
              expect(resp.body.length).toEqual(0);
            });
        });
    });
  });
});
