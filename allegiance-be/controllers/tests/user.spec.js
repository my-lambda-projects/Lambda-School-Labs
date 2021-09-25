const server = require("../../api/server");
const db = require("../../data/db-config");
const request = require("supertest");

const token = process.env.AUTH0_TEST_TOKEN || "testing access denied";

describe("user router", () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    return db.seed.run();
  });

  describe("GET /api/users", () => {
    it("returns the database users if successful", async () => {
      const response = await request(server)
        .get("/api/users")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.type).toBe("application/json");
      expect(response.status).toBe(200);
      expect(response.body.users.length).toEqual(50);
    });
  });

  describe("PUT /api/users/:id", () => {
    const changes = {
      username: "LesterTheTester",
      email: "testing@gmail.com",
      location: "77338"
    };
    it("returns newly updated user if successful", async () => {
      const response = await request(server)
        .put("/api/users/1")
        .send(changes)
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(200);
      expect(response.body.updated.username).toBe("LesterTheTester");
    });

    it("returns 404 if user not found", async () => {
      const response = await request(server)
        .put("/api/users/10000")
        .send(changes)
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("That user does not exist.");
    });
  });

  describe("GET /api/users/:id", () => {
    it("returns specified user if successful", async () => {
      const response = await request(server)
        .get("/api/users/1")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.type).toBe("application/json");

      expect(response.status).toBe(200);
      expect(response.body.user.username).toBeDefined();
    });
    it("returns 404 if user not found", async () => {
      const response = await request(server)
        .get("/api/users/10000")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("That user does not exist.");
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("returns success message if succesful", async () => {
      const response = await request(server)
        .delete("/api/users/1")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.type).toBe("application/json");
      expect(response.status).toBe(200);
    });
    it("returns 404 if user not found", async () => {
      const response = await request(server)
        .delete("/api/users/10000")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("That user does not exist.");
    });
  });

  describe("GET /api/users/:id/notifications", () => {
    it("returns success message if successful", async () => {
      const response = await request(server)
        .get("/api/users/1/notifications")
        .set({ Authorization: `Bearer ${token}`});
      expect(response.type).toBe("application/json");
      expect(response.status).toBe(200);
    })
    it("returns 404 if notifications are not found", async () => {
      const response = await request(server)
        .get("/api/users/10000/notifications")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(404);
    });
  })
});
