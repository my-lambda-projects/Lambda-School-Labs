
const request = require('supertest');
const server = require('../api/server.js');
const token = require('./token');

// test data
testGoogleID = '106501162578996443716';

testTemplate = {
    title: 'test Template 453',
    notes: 'test notes',
    starttime: '123',
    endtime: '123'
}
const newAdminInfo = {
    name: `Test Admin`,
    email: 'test_admin@gmail.com',
    googleId: `test123`
}
const testGroupInfo = {
    groupName: 'Success Group',
    groupDescription: 'This better work', 
    groupColor: 'red',
    groupIcon : 'square'
};

let testAdminId;
let testGroupId;
let testTemplateID = '';

describe('testing template router', () => {

    describe('post template', function(){
        // happy test
        it('should successfully post the template info', function(){
            return request(server)
                .post('/api/template')
                .send({...testTemplate, googleId: testGoogleID})
                .set('authorization', token)
                .then(res => {
                    // status 201
                    expect(res.status).toBe(201);

                    // message
                    expect(res.body.message).toBe('template created successfully');
                })
        });

        // error - googleID is missing
        it('should return error when template title is missing', function(){
            return request(server)
                .post('/api/template')
                .send({...testTemplate})
                .set('authorization', token)
                .then(res => {
                    // status 500
                    expect(res.status).toBe(500);

                    // error message
                    expect(res.body.errorMessageCatch.code).toBe('SQLITE_CONSTRAINT');
                })
        })
    })
    // Get all templates
    describe('get all templates', () => {
        // happy test -  everything works fine
        it('should successfully get the templates when googleID is valid', function() {
            return request(server)
                .get(`/api/template/${testGoogleID}`)
                .set('authorization', token)
                .then(res => {
                    // status
                    expect(res.status).toBe(200);

                    // template check
                    expect(res.body.templates[0].title).toBe(testTemplate.title);

                    // get templateID
                    testTemplateID = res.body.templates[0].id;
                });
        });

        // error testing - googleID is invalid
        it.todo('should return error when googleID is invalid');
    })
    // Add group to the template
    describe('add group to the template', () => {
        // get the adminId
        it('should get adminId', function(){
            return request(server)
            .post('/api/admin')
            .send(newAdminInfo)
            .set('authorization', token)
            .then(res => {
                // status 200
                expect(res.status).toBe(200);
                testAdminId = res.body.adminId;
            })
        })

        // get the groupId
        it('should successfully post the group info', function(){
            return request(server)
                    .post(`/api/groups/${testAdminId}`)
                    .send(testGroupInfo)
                    .set('authorization', token)
                    .then(res => {
                        // console.log('!!!!!!!', testAdminId, res.status, res.body)
                        expect(res.status).toBe(201)
                        testGroupId = res.body.newGroupId;
                    })
        });

        // add group to the template
        it('should successfully add the group to the template', function(){
            return request(server)
                    .post(`/api/template/${testTemplateID}/groups`)
                    .send({groupId: testGroupId, adminId: testAdminId})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(201)
                        expect(res.body.message).toBe('group successfully added to the event');
                    })
        });
        // add group to the template - error case - invalid groupId
        it('should respond with the error when groupId is invalid', function(){
            return request(server)
                    .post(`/api/template/${testTemplateID}/groups`)
                    .send({groupId: 4567, adminId: testAdminId})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(404)
                        expect(res.body.error).toBe('invalid group id');
                    })
        });
    })
    // Get a template
    describe('get a template', () => {
        // happy case
        it('should successfully get the template data', () => {
            return request(server)
                .get(`/api/template/templateInfo/${testTemplateID}`)
                .set('authorization', token)
                .then(res => {
                    // status 200
                    expect(res.status).toBe(200);
                    // template info
                    expect(res.body.title).toBe(testTemplate.title)
                    // template groups
                    expect(res.body.groups).toBeDefined();
                    // template group data
                    expect(res.body.groups[0].id).toBe(testGroupId);
                })
        })
    })
    
    // Delete group from the template
    describe('delete group from template', function(){
        // happy case
        it('should successfully delete the groups from the template', function(){
            return request(server)
                    .delete(`/api/template/${testTemplateID}/groups/${testAdminId}/${testGroupId}`)
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(200)
                        expect(res.body.message).toBe('group successfully deleted from the event');
                    })
        })

        // error case - invalid groupId
        it('should return error when groupId is invalid', function(){
            return request(server)
                    .delete(`/api/template/${testTemplateID}/groups/${testAdminId}/4567`)
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(404)
                        expect(res.body.error).toBe('invalid group id');
                    })
        })
    })
    // Delete the template
    describe('delete template', () => {
        it('should delete successfully when templateID is valid', function(){
            return request(server)
                .delete(`/api/template/${testTemplateID}`)
                .set('authorization', token)
                .then(res => {
                    // status
                    expect(res.status).toBe(200);

                    // success message
                    expect(res.body.message).toBe('template deleted successfully');
                });
        });

        // error scenario - templateID is invalid
        it('should throw an error when templateID is invalid', function(){
            return request(server)
                .delete('/api/template/xyz')
                .set('authorization', token)
                .then(res => {
                    // status
                    expect(res.status).toBe(404);

                    // error message
                    expect(res.body.message).toBe('template ID does not exist');
                });
        });
    })
})