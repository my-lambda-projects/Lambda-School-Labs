const request = require("supertest");

const db = require("../../data/dbconfig.js");

const server = require("../server.js");

// allows testing to be authorized
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

describe("interests", () => {
  beforeEach(() => db.seed.run());

  describe("GET /interests", () => {
    it("should return status 200", async () => {
      const res = await request(server)
        .get("/interests")
        .set("Authorization", `${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(5);
    });
  });

  describe("GET /interests/:interestid", () => {
    it("should return status 200", async () => {
      const res = await request(server)
        .get("/interests/1")
        .set("Authorization", `${token}`);

      expect(res.status).toBe(200);
    });

    it("should return Sports", async () => {
      const res = await request(server)
        .get("/interests/1")
        .set("Authorization", `${token}`);

      expect(res.body).toStrictEqual({ id: 1, name: "Sports" });
    });
  });

  describe("POST /user", () => {
    const userInterest = {
      user_id: 1,
      interests_id: 1
    };

    it("should return status 201", async () => {
      const res = await request(server)
        .post("/interests/user")
        .set("Authorization", `${token}`)
        .send(userInterest);

      expect(res.status).toBe(201);
    });

    it("adds to the user_interests table", async () => {
      let res = await db("user_interests");

      expect(res).toHaveLength(0);

      await request(server)
        .post("/interests/user")
        .set("Authorization", `${token}`)
        .send(userInterest);

      res = await db("user_interests");

      expect(res).toHaveLength(1);
    });
  });

  describe("DELETE /user/:userid/:interestid", () => {
    const userInterest = {
      user_id: 1,
      interests_id: 1
    };

    it("returns a status of 200 and delete entry", async () => {
      await request(server)
        .post("/interests/user")
        .set("Authorization", `${token}`)
        .send(userInterest);

      let res = await db("user_interests");

      expect(res).toHaveLength(1);

      const response = await request(server)
        .del("/interests/user/1/1")
        .set("Authorization", `${token}`);

      res = await db("user_interests");

      expect(res).toHaveLength(0);
      expect(response.status).toBe(200);
    });
  });
});
