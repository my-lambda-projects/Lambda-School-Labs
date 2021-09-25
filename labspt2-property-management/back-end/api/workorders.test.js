const request = require('supertest');
const expect = require('chai').expect;
const app = ('https://tenantly-back.herokuapp.com');

// Testing Get Request for Workorder
describe('Workorders Route Tests', () => {
    describe('get /', () => {
        it('responds with 200', function(done) {
            request(app)
            .get('/workorders/')
            .expect(200)
            .end(done);
        }) 
     });

     //  Testing Get Request for Workorder by ID
     describe('Get Workorders by ID', () => {
        it('responds with 200', function(done) {
            request(app)
            .get('/workorders/1')
            .expect(200)
            .end(done);
        })
    });
    // Testing Post for Workorder
    describe('Post workorder', function () {
        it('responds with 201', function(done) {
            request(app)
            .post('/workorders')
            .send({
                "id": 22,
                "property": 2,
                "tenant": 3,
                "description": "None of the toilets flush!",
                "phone": "202-555-6132",
                "unsupervisedEntry": true,
                "status": "Pending"
            })
            .expect(201)
            .end(done);
        })
    });
    // Testing Put for Workorder
    describe('Put workorder', function () {
        it('responds with 200', function(done) {
            request(app)
            .put('/workorders/22')
            .send({
                "id": 22,
                "property": 1,
                "tenant": 2,
                "description": "Air conditioner does not blow cold air!",
                "phone": "415-555-6444",
                "unsupervisedEntry": 1,
                "status": "Pending"
            })
            .expect(200)
            .expect({
                message: 'Work order updated'
            })
            .end(done);
        })
    })
    // Testing Delete for Workorder
    describe('Delete workorder', function () {
        it('responds with 202', function(done) {
            request(app)
            .delete('/workorders/22')
            .expect(202)
            .expect({
                message: 'Workorder deleted'
            })
            .end(done);
        })
    })

});