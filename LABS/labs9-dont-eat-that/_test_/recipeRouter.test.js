// This is a testing for  endpoints in recipeRouter.js
// At the moment it has several limitations
// 1. due to having sqlite3 DB in local server, post/put doesn't work correctly
// 2. for delete and edit, recipe ID needs to be manually changed before 
//     every test.  Some way to automatically get an appropriate ID is needed.
//3. Currently it is testing local server.  it needs to be edited so it can test deployed server


const request = require("supertest");

const server = require("../server.js");

const recipeRouterURL = "/api/recipes";

// like to delete test recipe but do not know the recipe id to delete it
// beforeEach(async () => {
//     const temp = await request(server).delete(recipeRouterURL+"delete");
//    });

  describe("/ route", () => {
    it("should return status code 200", async () => {
      let response = await request(server).get("/");
  
      expect(response.status).toBe(200);
    });
  
    it("should return json response type ", async () => {
      let response = await request(server).get("/");
  
      expect(response.type).toBe("application/json");
    });
  
    it('should return with a body like: { "Welcome to the .." }', async () => {
      let response = await request(server).get("/");
  
      expect(response.body).toContain("Welcome to the ");
    });

  })


describe("/api/recipes/all  GET", () => {
const localURL = "/all";


    it("should return status code 200", async () => {
      let response = await request(server).get(recipeRouterURL+localURL);
        expect(response.status).toBe(200);
    });
  
    it("should return json response type ", async () => {
       let response = await request(server).get(recipeRouterURL+localURL);
  
      expect(response.type).toBe("application/json");
    });
  
    it('should return defined object', async () => {
       let response = await request(server).get(recipeRouterURL+localURL);
  
      expect(response.body).toBeDefined();
      expect(response.body).toBeO
    });

  })

  describe("/api/recipes/:userid  GET", () => {
    const localURL = "/1";
    it("should return status code 200", async () => {
      let response = await request(server).get(recipeRouterURL+localURL);
        expect(response.status).toBe(200);
    });
  
    it("should return json response type ", async () => {
       let response = await request(server).get(recipeRouterURL+localURL);
  
      expect(response.type).toBe("application/json");
    });
  
    it('should return defined object', async () => {
       let response = await request(server).get(recipeRouterURL+localURL);
  
      expect(response.body).toBeDefined();
      expect(response.body).toEqual(    [{
        "id": 1,
        "name": "taco",
        "description": "Enjoy!",
        "user_id": 1
       }])
    });

  })


  describe("/api/recipes/one/:id  GET", () => {
    const localURL = "/one/1";
    it("should return status code 200", async () => {
      let response = await request(server).get(recipeRouterURL+localURL);
        expect(response.status).toBe(200);
    });
  
    it("should return json response type ", async () => {
       let response = await request(server).get(recipeRouterURL+localURL);
  
      expect(response.type).toBe("application/json");
    });
  
    it('should return defined object', async () => {
       let response = await request(server).get(recipeRouterURL+localURL);
  
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty("name");
      
    });

  })


  // test deleting a recipe with recipe id
// need to check/change id before testing...

  describe("/api/recipes/delete  DELETE", () => {
    
    // change recipe ID that you want to delete
    const localURL = "/delete/36";
   


    it("should return status code 200, JSON and have property of name", async () => {
      let response = await request(server).delete(recipeRouterURL+localURL);

        expect(response.status).toBe(200);
    
    
      expect(response.type).toBe("application/json");

      expect(response.body).toBe(1);
      
    });

    // if wrong id is used to delete
    it("should return status code 404 and has property message" , async () => {
      let response = await request(server).delete(recipeRouterURL+"delete/987");

        expect(response.status).toBe(404);
    
    
      
    });

  })

// testing edit endpoint
// use recipe id #10 for testing
//   // currently having error due to local DB is sqlite3 and not PostgreSQL

/*
  describe("/api/recipes/edit/:id PUT", () => {
    const localURL = "/edit/10";
   const input = { 
      name: "Edited name",  
    description: "test descr", 
    userid : 856, 
    ingredients:"test ingred"
  };
     

    it("should return status code 200", async () => {
      let response = await request(server)
      .put(recipeRouterURL+localURL)
      .send(input);
   
      expect(response.status).toBe(200);
    });
  
    it("should return json response type ", async () => {
       let response = await request(server)
       .put(recipeRouterURL+localURL)
        .send(input);

      expect(response.type).toBe("application/json");
    });
  
    it('should return defined object', async () => {
       let response = await request(server)
       .put(recipeRouterURL+localURL)
       .send(input);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty("name");
      
    });
   

  })

*/

  
  // testing create endpoint
  // currently having error due to local DB is sqlite3 and not PostgreSQL
// will modify later
  
/*
  describe("/api/recipes/create  POST", () => {
    const localURL = "/create";

    const input = { 
      "name": "Ace5",  
    "description": "test descr", 
    "userid" : 856, 
    "ingredients":"test ingred"
  };
   

    it("should return status code 200", async () => {
      let response = await request(server)
      .post(recipeRouterURL+localURL)
      .send(input);
   
      expect(response.status).toBe(200);
    });
  
    it("should return json response type ", async () => {
       let response = await request(server)
       .post(recipeRouterURL+localURL)
        .send(input);

      expect(response.type).toBe("application/json");
    });
  
    it('should return defined object', async () => {
       let response = await request(server)
       .post(recipeRouterURL+localURL)
       .send(input);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty("name");
      
    });
   

  })

  */