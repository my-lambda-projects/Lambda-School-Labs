const request = require("supertest");

const db = require("../config/db-config");

const server = require("../api/server.js");

describe("HTTP Request Tests", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("tests are running with DB_ENV set to 'testing'", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });



})
  describe('POST register', () => {
    it('fail bc its not a vaild table column 500', () => {
      return request(server)
      //fail
        .post('/api/auth/register')
        .send({ blog_summary: 'i should get a server error' })
        .then(response => {
          expect(response).toHaveProperty('status', 500);
        });
    });
    it('register', () => {
      return request(server)
        .post('/api/auth/register')
        .send({ username: 'sda',password:"yyet"})
        .then(response => {
            expect(response).toHaveProperty('status', 201);
          });
    });
  });
  describe('POST Login', () => {
    it('should post a new blog and return a status code of 500', () => {
      return request(server)
        .post('/api/auth/login')
        .send({ blog_summary: 'i am a failing test' })
        .then(response => {
          expect(response).toHaveProperty('status', 500);
        });
    });
    it('LOGIN', () => {
      return request(server)
        .post('/api/auth/login')
        .send({ username:'yikes',password:"fafsdasfdas" })
        .then(res => {
            expect(res.type).toMatch(/json/);
          });
    });
  })