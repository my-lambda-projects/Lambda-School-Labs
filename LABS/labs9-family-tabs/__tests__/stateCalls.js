const supertest = require("supertest");
const server = require("../server/server");

const request = supertest(server);

const newLoginPass = {
  userName: "Buster Smith",
  email: "chilldude22@fake.com",
  familyID: 2,
  isAdmin: false,
  phone: "555-867-5309"
};

const incompleteLogin = {
  userName: "Buster Smith",
  email: "chilldude22@fake.com"
};

const goodEmail = "mjones@gmail.com";
const badEmail = "banana";

describe("New log-in", () => {
  it("Required data returns correct response", async () => {
    const response = await request.post("/newlogin").send(newLoginPass);
    expect(response.status).toEqual(201);
    expect(response.type).toBe("application/json");
    let shape = Object.keys(JSON.parse(response.text)).length;
    expect(shape).toBe(7);
  });
  it("Incomplete data returns error response", async () => {
    const response = await request.post("/newlogin").send(incompleteLogin);
    expect(response.status).toEqual(500);
    expect(response.type).toBe("application/json");
    expect(response.text).toEqual(
      '{"err":{"errno":19,"code":"SQLITE_CONSTRAINT"}}'
    );
  });
});

describe("Get profile by email", () => {
  it("Returns user profile data with existing email", async () => {
    const response = await request.get(`/profile/${goodEmail}`);
    expect(response.status).toEqual(200);
    expect(response.type).toBe("application/json");
    let shape = Object.keys(JSON.parse(response.text)).length;
    expect(shape).toBe(9);
  });
  it("Returns correct message response for non existant email", async () => {
    const response = await request.get(`/profile/${badEmail}`);
    expect(response.type).toBe("application/json");
    expect(JSON.parse(response.text)).toEqual({"message": "no profile"});
  });
});

describe("Return family member data by family id", () => {
    it("Returns family from existing family id", async () => {
      const response = await request.get(`/familymembers/1`);
      expect(response.status).toEqual(200);
      expect(response.type).toBe("application/json");
      let shape = JSON.parse(response.text);
      let profileShape = Object.keys(shape[0]).length
      expect(profileShape).toBe(8);
      expect(Array.isArray(shape)).toBe(true);
    });
    it("Returns correct error response for non existant family id", async () => {
      const response = await request.get(`/familymembers/q`);
      expect(response.type).toBe("application/json");
      expect(JSON.parse(response.text)).toEqual([]);
    });
  });
 
  describe("Return event data by family id", () => {
    it("Returns event data from existing family id", async () => {
      const response = await request.get(`/fulleventsbyfamily/1`);
      expect(response.status).toEqual(200);
      expect(response.type).toBe("application/json");
      let shape = JSON.parse(response.text);
      let profileShape = Object.keys(shape[0]).length
      expect(profileShape).toBe(16);
      expect(Array.isArray(shape)).toBe(true);
    });
    it("Returns correct error response for non existant family id", async () => {
      const response = await request.get(`/fulleventsbyfamily/y`);
      expect(response.type).toBe("application/json");
      expect(JSON.parse(response.text)).toEqual({message:"no family at that id"});
    });
  });

  describe("Users with position in users with events table", () => {
    it("Returns event data from existing event", async () => {
      const response = await request.get(`/eventbyusers/1`);
      expect(response.status).toEqual(200);
      expect(response.type).toBe("application/json");
      let shape = JSON.parse(response.text);
      let profileShape = Object.keys(shape[0]).length
      expect(profileShape).toBe(2);
      expect(Array.isArray(shape)).toBe(true);
    });
    it("Returns correct error response for non existant family id", async () => {
      const response = await request.get(`/eventbyusers/y`);
      expect(response.status).toEqual(500);
      expect(response.type).toBe("application/json");
      expect(JSON.parse(response.text)).toEqual({err: "failed to get all users for scheduled event" });
    });
  });