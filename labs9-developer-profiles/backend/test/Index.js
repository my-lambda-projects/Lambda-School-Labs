//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("GET", () => {
    it("Can succesfully make a request", () => {
      chai.request(server)
          .get("/")
          .end((err, res) => {
              res.should.have.status(200);
              done();
          });
    });
});
