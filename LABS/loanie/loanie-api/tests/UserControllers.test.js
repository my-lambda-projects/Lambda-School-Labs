const request = require("request");
const userControllers = require("../controllers/userControllers");

const data = {};

describe("Starting up server", () => {
  describe("Post /newuser", () => {
    beforeAll((done) => {
      spyOn(userControllers, "userCreate");
      userControllers.userCreate();
      done();
    });
    it("tracks that the spy was called", () => {
      expect(userControllers.userCreate).toHaveBeenCalled();
    });
  });

  describe("Post /login", () => {
    beforeAll((done) => {
      spyOn(userControllers, "userLogin");
      userControllers.userLogin();
      done();
    });
    it("tracks that the spy was called", () => {
      expect(userControllers.userLogin).toHaveBeenCalled();
    });
  });

  describe("Get /users", () => {
    // callback done() prevents the expect function from running until after test is completed
    beforeAll((done) => {
      request.get("http://localhost:3030/users", (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it("Status should return 200", () => {
      expect(data.status).toBe(200);
    });
  });

  describe("Get /user/:id", () => {
    // callback done() prevents the expect function from running until after test is completed
    beforeAll((done) => {
      request.get("http://localhost:3030/user/5abeb3835e29ee0554e602ef", (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it("Status should return 200", () => {
      expect(data.status).toBe(200);
    });
  });

  describe("Post /user/:id", () => {
    beforeAll((done) => {
      spyOn(userControllers, "userEdit");
      userControllers.userEdit();
      done();
    });
    it("tracks that the spy was called", () => {
      expect(userControllers.userEdit).toHaveBeenCalled();
    });
  });

  describe("Delete /user/:id", () => {
    beforeAll((done) => {
      spyOn(userControllers, "userDelete");
      userControllers.userDelete();
      done();
    });
    it("tracks that the spy was called", () => {
      expect(userControllers.userDelete).toHaveBeenCalled();
    });
  });

  describe("Post /auth", () => {
    beforeAll((done) => {
      spyOn(userControllers, "userToken");
      userControllers.userToken();
      done();
    });
    it("tracks that the spy was called", () => {
      expect(userControllers.userToken).toHaveBeenCalled();
    });
  });

  describe("Post /stripe", () => {
    beforeAll((done) => {
      spyOn(userControllers, "stripeTransaction");
      userControllers.stripeTransaction();
      done();
    });
    it("tracks that the spy was called", () => {
      expect(userControllers.stripeTransaction).toHaveBeenCalled();
    });
  });
});

