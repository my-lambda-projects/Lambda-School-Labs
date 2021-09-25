const request = require("supertest");

const db = require("../../data/dbconfig.js");

const server = require("../server.js");

let token;
const user = { email: "test@example.com", password: "******" };
beforeAll(done => {
  request(server)
    .post("/auth/signup")
    .send({
      ...user,
      first_name: "Tester",
      last_name: "Test",
      location: "12345"
    })
    .then(result => {
      request(server)
        .post("/auth/signin")
        .send(user)
        .end((err, response) => {
          token = response.body.token; // save the token!
          done();
        });
    });
});

describe("usersRouter.js", () => {
  // Re-runs the seeds before each test
  beforeEach(() => db.seed.run());

  describe("GET /users", () => {
    it("responds with 200 OK", async () => {
      const res = await request(server)
        .get("/users")
        .set("Authorization", `${token}`);

      expect(res.status).toBe(200);
    });

    it("gets all users", async () => {
      const res = await request(server)
        .get("/users")
        .set("Authorization", `${token}`);

      expect(res.body).toHaveLength(2);
    });
  });

  describe("GET /users/:id", () => {
    it("responds with 200 OK", async () => {
      const res = await request(server)
        .get("/users/1")
        .set("Authorization", `${token}`);

      expect(res.status).toBe(200);
    });

    it("gets user by id", async () => {
      const res = await request(server)
        .get("/users/2")
        .set("Authorization", `${token}`);

      expect(res.body).toStrictEqual({
        id: 2,
        first_name: "Tommy",
        last_name: "Red",
        password: "pass",
        email: "test2@gmail.com",
        location: "66666"
      });
    });
  });

  describe("DELETE /users/:id", () => {
    it("responds with 200 OK", async () => {
      const res = await request(server)
        .del("/users/1")
        .set("Authorization", `${token}`);

      expect(res.status).toBe(200);
    });

    it("deletes by id", async () => {
      let res = await request(server)
        .del("/users/1")
        .set("Authorization", `${token}`);

      expect(res.body).toStrictEqual({
        message: "Successfully deleted user"
      });

      res = await request(server)
        .get("/users")
        .set("Authorization", `${token}`);

      expect(res.body).toHaveLength(1);
    });
  });

  describe("PUT /users/:id", () => {
    it("responds with 200 OK", async () => {
      const changes = {
        first_name: "Kevin"
      };

      const res = await request(server)
        .put("/users/1")
        .set("Authorization", `${token}`)
        .send(changes);

      expect(res.status).toBe(200);
    });

    it("updates changes for the user with the appropriate id", async () => {
      const changes = {
        first_name: "Kevin"
      };

      let res = await request(server)
        .put("/users/2")
        .set("Authorization", `${token}`)
        .send(changes);

      res = await request(server)
        .get("/users/2")
        .set("Authorization", `${token}`);

      expect(res.body).toStrictEqual({
        id: 2,
        first_name: "Kevin",
        last_name: "Red",
        password: "pass",
        email: "test2@gmail.com",
        location: "66666"
      });
    });
  });
});
