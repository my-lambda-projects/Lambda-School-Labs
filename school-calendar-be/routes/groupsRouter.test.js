const request = require('supertest');
const server = require('../api/server');
const token = require('./token');

const newAdminInfo = {
    name: `Test Admin`,
    email: 'test_admin@gmail.com',
    googleId: `test123`
}
const group = {
    groupName: 'Success Group',
    groupDescription: 'This better work', 
    groupColor: 'red',
    groupIcon : 'square'
};
const changedGroup = {
    groupName: 'Success Group Changed',
    groupDescription: 'I hope it worked!'
}; 
const contact = {
    firstName: 'Test Contact',
    lastName: 'Test Contact',
    phoneNumber: '0000000000',
    email: 'test@email.com'
};
let testAdminId;
let testContactId;
let testGroupId;


describe('testing groups router', () => {
    describe('get adminId', () => {
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
    })
    // POST Groups
    describe('post group', function(){
        // 1. happy case - post group and map it to adminID
        it('should successfully post the group info', function(){
            return request(server)
                    .post(`/api/groups/${testAdminId}`)
                    .send({...group})
                    .set('authorization', token)
                    .then(res => {
                        console.log('!!!!!!!', testAdminId, res.status, res.body)
                        expect(res.status).toBe(201)
                        expect(res.body.groups).toBeDefined();
                        testGroupId = res.body.newGroupId;
                    })
        });
            // 2. error case - invalid adminID in the request
        it('should return error when invalid adminId in the request', function(){
            return request(server)
                    .post(`/api/groups/4056`)
                    .send({...group})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(500)
            })
        });
    })
    // GET Groups for adminId
    describe('get all groups', () => {
         // 1. happy case - adminId is valid and admin has groups
        it('should successfully get all groups for provided adminId', function(){
            return request(server)
                    .get(`/api/groups/${testAdminId}`)
                    .set('authorization', token)
                    .then(res => {
                        // console.log('from get groups test', res.status, res.body);
                        expect(res.status).toBe(200)
                        expect(res.body.groups).toBeDefined();
                        testGroupId = res.body.groups[0].id;
                    })
        });
        // 2. happy case - adminId is valid but he does not have any groups
        it('adminId is valid but does not have any groups', function(){
            return request(server)
                    .get(`/api/groups/${testAdminId}`)
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(200)
                        expect(res.body.groups).toBeDefined()
                    })
        });
        // 3. error case - invalid adminId
        it('error response when adminId is invalid', function(){
            return request(server)
                    .get(`/api/groups/200`)
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(200)
                        expect(res.body.groups).toHaveLength(0)
                    })
        })
    })
    //  POST Contact to the group
    describe('post contact', () => {
        it('should post contact and get id', function(){
            return request(server)
                    .post('/api/contacts')
                    .send({...contact, adminId: testAdminId})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(201)
                        testContactId = res.body[0]
                    })
        })

        // check groups for a particular contact - groups empty
        it('should not have the group in the contact info', function(){
            return request(server)
                .get(`/api/contacts/${testAdminId}/${testContactId}/groups`)
                .set('authorization', token)
                .then(res => {
                    expect(res.body.groups).toHaveLength(0);
                })
        })
        // 1. happy case - valid groupID & contactID
        it('should successfully post relationship to contact_group with valid groupId and contactId', function(){
            return request(server)//
                    .post(`/api/groups/${testAdminId}/${testGroupId}/contacts`)
                    .send({contacts: [testContactId]})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(201)
                        expect(res.body.message).toBe('contact added successfylly to the group')
                    })
        })
        // 2. error case - valid groupID & invalid contactID
        it('error response when groupId is valid but not contactId', function(){
            return request(server)//
                    .post(`/api/groups/${testAdminId}/${testGroupId}/contacts`)
                    .send({contacts: ['99999']})
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(404)
                        // console.log('res.body', res.body);
                        expect(res.body.error).toBe('invalid contact id')
                    })
        })
        // check groups for a particular contact - groups have test group
        it('should have the group in the contact info', function(){
            return request(server)
                .get(`/api/contacts/${testAdminId}/${testContactId}/groups`)
                .set('authorization', token)
                .then(res => {
                    expect(res.body.groups[0].id).toBe(testGroupId);
                })
        })
        
    })

    // GET group by groupID
    describe('get particular group', () => {
        // 1. happy case - valid groupID - **check for contacts field**
        it('should successfully get group with provided groupId', function(){
            return request(server)
                    .get(`/api/groups/${testAdminId}/${testGroupId}`)
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(200)
                        expect(res.body.id).toBe(testGroupId)
                        expect(res.body.contacts[0].firstName).toBe(contact.firstName);
                    })
        })
        // 2. error case -  invalid groupID
        it('error response when provided with invalid groupId', function(){
            return request(server)
                    .get(`/api/groups/${testAdminId}/99999`)
                    .set('authorization', token)
                    .then(res => {
                        expect(res.status).toBe(404)
                        expect(res.body.error).toBe('invalid group id')
                    })
        })
    })
    // DELETE Contact from a group
    describe('DELETE /groups/:groupId', () => {
        it('should delete the contact from a group', function(){
            return request(server)
            .delete(`/api/groups/${testAdminId}/${testGroupId}/contacts`)
            .send({contacts: [testContactId]})
            .set('authorization', token)
            .then(res => {
                expect(res.status).toBe(201)
                expect(res.body.message).toBe('contact removed from the group successfully!');
            });
        });
    // 2. error case - valid groupID & contactID , contact not in the group
        it('should throw error with invalid groupId', () => {
            return request(server)
                .delete(`/api/groups/${testAdminId}/3368/contacts`)
                .then(res => {
                    expect(res.status).toBe(500);
                });
        });
    });
    // PUT group
    // 1. happy case - edit group with valid groupID
    describe('put request', function() {
        it('should edit group with valid groupID', function(){
            return request(server)
                .put(`/api/groups/${testAdminId}/${testGroupId}`)
                .send({...changedGroup})
                .set('authorization', token)
                .then(res => {
                    expect(res.status).toBe(201);
                });
            });
        // error case
        it('should return 500, no update info provided', function() {
            return request(server)
                .put(`/api/groups/${testAdminId}/${testGroupId}`)
                .then(res => {
                    expect(res.status).toBe(500)
                });
        });
    });
// DELETE group
    // 1. happy case - delete group with valid groupID
    describe('DELETE group', () => {
        it('should delete successfully when groupID is valid', function() {
            return request(server)
                .delete(`/api/groups/${testAdminId}/${testGroupId}`)
                .set('authorization', token)
                .then(res => {
                    expect(res.status).toBe(201)
                    expect(res.body.message).toBe('group deleted successfully!')
                });
        });
      // error case 
        it('should throw error with invalid adminId', () => {
            return request(server)
                .delete(`/api/groups/4567/${testGroupId}`)
                .then(res => {
                    expect(res.status).toBe(500);
                });
        });
    });
})



