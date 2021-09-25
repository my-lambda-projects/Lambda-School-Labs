const request = require("supertest");
const db = require("../data/dbConfig");

const server = require("../api/server");

describe("listings", () => {
  beforeAll(async () => {
    await db("listings").truncate();
  });

  describe("post a listing", () => {
    it("should return a 200", () => {
      const listing = {
        picture_url: "test",
        name: "test",
        city: "test",
        room_type: "test",
        guests_included: "1",
        bedrooms: "1",
        beds: "1",
        bathrooms: "1",
        user_email: "test"
      };

      return request(server)
        .post("/api/listings/save")
        .send(listing)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("retrieve a listing", () => {
    it("should return a 200", () => {
      return request(server)
        .get("/api/listings/1")
        .then(res => {
          console.log(JSON.stringify(res.body));
          expect(res.status).toBe(200);
        });
    });
  });

  describe("retrieve listings db", () => {
    it("should return a 200", () => {
      return request(server)
        .get("/api/listings")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("update a listing", () => {
    const newListing = {
      picture_url: "update test",
      name: "update test",
      city: "update test",
      room_type: "update test",
      guests_included: "2",
      bedrooms: "2",
      beds: "2",
      bathrooms: "2",
      user_email: "update test"
    };
    it("should return a 200", () => {
      return request(server)
        .put("/api/listings/1")
        .send(newListing)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    // describe("update a listing that doesn't exist", () => {
    //   it("should return a 404", () => {
    //     return request(server)
    //       .put("/api/listings/2")
    //       .send(newListing)
    //       .then(res => {
    //         expect(res.status).toBe(404);
    //       });
    //   });
    // });
  });

  describe("delete a listing", () => {
    it("should return a 200", () => {
      return request(server)
        .delete("/api/listings/1")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    describe("delete a listing that doesn't exist", () => {
      it("should return a 404", () => {
        return request(server)
          .delete("/api/listings/2")
          .then(res => {
            expect(res.status).toBe(404);
          });
      });
    });
  });
});
