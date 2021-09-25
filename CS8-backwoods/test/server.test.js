let chai = require('chai');
let chaiHttp = require('chai-http');

let app = require('../server');
const { expect } = chai;

chai.use(chaiHttp);

describe('[GET]', () => {
  it('it should return a object and status code 200', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        if (err) {
          console.log(err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');

        done();
      });
  });
});
