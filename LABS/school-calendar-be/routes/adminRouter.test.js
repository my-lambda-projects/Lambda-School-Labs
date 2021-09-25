const request = require('supertest');
const server = require('../api/server.js');
const token = require('./token.js');

//Test Data
let counter = 21;

newAdminInfo = {
    name: `Test Admin ${counter}`,
    email: 'test_admin@gmail.com',
    googleId: `test123${counter}`
}


// test cases
describe('testing admin router', function(){

    describe('post admin', function(){

        // 1. happy case - new admin with new googleID
        // it('should successfully post the admin info', function(){
        //     return request(server)
        //         .post('/api/admin')
        //         .send(newAdminInfo)
        //         .set('authorization', token)
        //         .then(res => {
        //             // status 200
        //             expect(res.status).toBe(200);

        //             // message
        //             expect(res.body.message).toBe('admin posted')

        //             // adminId
        //             expect(res.body.adminId).toBeDefined();
        //             return counter++;
        //         })
        // });

        // 2. happy case - returning admin with existing googleID
        it('should successfully post the admin info', function(){
            return request(server)
                .post('/api/admin')
                .send(newAdminInfo)
                .set('authorization', token)
                .then(res => {
                    // status 200
                    expect(res.status).toBe(200);

                    // message
                    expect(res.body.message).toBe('admin exists in database')

                    // adminId
                    expect(res.body.adminId).toBeDefined();
                })
        })
    })

})


