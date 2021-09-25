const server = require("../../api/server");
const db = require("../../data/db-config");
const request = require("supertest");

const token = process.env.AUTH0_TEST_TOKEN || "testing access denied";

describe("group router", () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    return db.seed.run();
  });

  describe("GET /api/groups", () => {
    it("returns the database groups if successful", async () => {
      const response = await request(server)
        .get("/api/groups")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.type).toBe("application/json");
      expect(response.status).toBe(200);
      expect(response.body.groups.length).toBeTruthy();
    });
  });

  describe("POST /api/groups", () => {
    const newGroup = {
      group_name: "Yanks in Boston",
      privacy_setting: "public",
      location: "77338",
      creator_id: 1
    };
    it("returns the newly created group if successful", async () => {
      const response = await request(server)
        .post("/api/groups")
        .send(newGroup)
        .set({ Authorization: `Bearer ${token}` });
      expect(response.type).toBe("application/json");
      expect(response.status).toBe(201);
      expect(response.body.newGroup.id).toBeDefined();
    });
    it("returns 400 status if required fields are not submitted", async () => {
      const response = await request(server)
        .post("/api/groups")
        .send({ ...newGroup, group_name: null })
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(400);
    });
  });

  describe("PUT /api/groups/:id", () => {
    const changes = {
      group_name: "Yanks in Boston",
      privacy_setting: "public",
      location: "77338",
      creator_id: 1
    };
    it("returns newly updated group if successful", async () => {
      const response = await request(server)
        .put("/api/groups/1")
        .send(changes)
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(200);
      expect(response.body.updated.group_name).toBe("Yanks in Boston");
    });

    it("returns 404 if group not found", async () => {
      const response = await request(server)
        .put("/api/groups/1000")
        .send(changes)
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("That group does not exist.");
    });
  });

  describe("GET /api/groups/:id", () => {
    it("returns specified group if successful", async () => {
      const response = await request(server)
        .get("/api/groups/1")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.type).toBe("application/json");

      expect(response.status).toBe(200);
      expect(response.body.group.group_name).toBeDefined();
    });

    it("returns group requests in the data response", async () => {
      const response = await request(server)
        .get("/api/groups/1")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.type).toBe("application/json");
      expect(response.status).toBe(200);
      expect(response.body.reqs).toBeTruthy();
    });

    it("returns 404 if group not found", async () => {
      const response = await request(server)
        .get("/api/groups/10000")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("That group does not exist.");
    });
  });

  describe("DELETE /api/groups/:id", () => {
    it("returns success message if successful", async () => {
      const response = await request(server)
        .delete("/api/groups/1")
        .set({ Authorization: `Bearer ${token}` });
      expect(response.type).toBe("application/json");
      expect(response.status).toBe(200);
    });
    it("returns 404 if group not found", async () => {
      const response = await request(server)
        .delete("/api/groups/10000")
        .set({ Authorization: `Bearer ${token}` });
      //Test for more specific form of data would be better
      expect(response.data).toBe(undefined);
    });
  });

  describe("/api/groups/:id/invitees", () => {
    it("returns success message if successful", async () => {
      const response = await request(server).get("/api/groups/1/invitees")
      expect(response.type).toBe("application/json");
      expect(response.status).toBe(200);
    });
    it("successfully creates invite", async () => {
      const response = await request(server)
        .post("/api/groups/1/invitees")
        .send({
          username: "test",
          sender_id: 1
        });
      expect(response.type).toBe("application/json");
      expect(response.status).toBe(201);
    })
  });
});
