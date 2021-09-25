// This is a testing for  endpoints in recipeRouter.js
// At the moment it has several limitations
// 1. due to having sqlite3 DB in local server, post/put doesn't work correctly
// 2. for delete and edit, recipe ID needs to be manually changed before 
//     every test.  Some way to automatically get an appropriate ID is needed.
//3. Currently it is testing local server.  it needs to be edited so it can test deployed server


const request = require("supertest");

const server = require("../server.js");

const recipeRouterURL = "/api/users";

// like to delete test recipe but do not know the recipe id to delete it
// beforeEach(async () => {
//     const temp = await request(server).delete(recipeRouterURL+"delete");
//    });

  describe("/all route", () => {
    it("should return status code 200", async () => {
      let response = await request(server).get("/");
  
      expect(response.status).toBe(200);
    });
  
    it("should return json response type ", async () => {
      let response = await request(server).get("/");
  
      expect(response.type).toBe("application/json");
    });
  
    it('should return arrary in a body ', async () => {
      let response = await request(server).get("/");
  
      expect.arrayContaining(response.body);
    });

  })
