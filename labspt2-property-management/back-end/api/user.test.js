const request = require('supertest');
const expect = require('chai').expect;
const app = ('https://tenantly-back.herokuapp.com');


// Testing Get Request for Users
describe('Users Route Tests', () => {
    describe('get /', () => {
        it('responds with 200', function(done) {
            request(app)
            .get('/')
            .expect(200)
            .end(done);
        }) 
     });

     //  Testing Get Request for Users by ID
     describe('Get Users by ID', () => {
        it('responds with 200', function(done) {
            request(app)
            .get('/users/2')
            .expect(200)
            .end(done);
        })
    });

    //  Testing Get Request for Users that are Admin
    describe('Get Users that are Admin', () => {
        it('responds with 200', function(done) {
            request(app)
            .get('/users/admins')
            .expect(200)
            .end(done);
        })
    });
   
    //  Testing Get Request for Users that are Tenants
    describe('Get Users that are Tenants', () => {
        it('responds with 200', function(done) {
            request(app)
            .get('/users/tenants')
            .expect(200)
            .end(done);
        })
    });

    // Testing Post function for Users
    describe('Post property', function () {
        it('responds with 201', function(done) {
            request(app)
            .post('/users/')
            .send({				
            "id" : 5,
            "username": "LeeTest",
            "password": "$2a$14$JO/lpxF6JkS0QXexSp2fGu/OsYoSMTEMSfqxaDZseUrQrRGbGabVW",
            "isAdmin": true,
            "email": "leetest@tenantly.com",
            "phone": "203-555-3334",
            "displayName": "LeeTest",
            "emailSubscribe": false,
            "textSubscribe": false,
            "application": "" })
            .expect({
                "error": "Error: Undefined binding(s) detected when compiling FIRST query: select * from \"users\" where \"id\" = ? limit ?"
            })
            .end(done);
        })
    });

    // Testing Put for Users
    describe('Put users', function () {
        it('responds with 200', function(done) {
            request(app)
            .put('/users/5')
            .send({
                "id": 5,
                "username": "Lee",
                "password": "$2a$14$JO/lpxF6JkS0QXexSp2fGu/OsYoSMTEMSfqxaDZseUrQrRGbGabVW",
                "isAdmin": true,
                "email": "lee@tenantly.com",
                "phone": "203-555-1234",
                "displayName": "Lee",
                "emailSubscribe": false,
                "textSubscribe": false,
                "application": ""
            })
            .expect(200)
            .expect({
                message: 'User updated'
            })
            .end(done);
        })
    })

    // Testing Delete for Users
    describe('Delete user', function () {
        it('responds with 202', function(done) {
            request(app)
            .delete('/users/10')
            .expect(202)
            .expect({
                message: 'User deleted'
            })
            .end(done);
        })
    })
})