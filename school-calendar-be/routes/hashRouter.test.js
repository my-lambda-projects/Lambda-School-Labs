const request = require('supertest');
const server = require('../api/server');
const token = require('./token');

const testAdminInfo = {
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

const testContactInfo = {
    firstName: 'test one',
    lastName: 'test',
    email: 'test1@test.com',
    phoneNumber: '1234567890'
};

let testGroupInviteHash;

let testAdminId;
let testGroupId;

describe('hash route testing', () => {
    // Post Admin to the databse
    describe('get adminId', () => {
        it('should get adminId', function(){
            return request(server)
            .post('/api/admin')
            .send(testAdminInfo)
            .set('authorization', token)
            .then(res => {
                // status 200
                expect(res.status).toBe(200);

                // get testAdminId
                testAdminId = res.body.adminId;
            })
        })
    })
    // Post Group to the database
    describe('get groupId', () => {
        it('should get groupId', function(){
            return request(server)
                    .post(`/api/groups/${testAdminId}`)
                    .send({...testGroupInfo})
                    .set('authorization', token)
                    .then(res => {
                        // status 201
                        expect(res.status).toBe(201);
                        testGroupId = res.body.newGroupId;
                    })
        })
    })
    // Get groupInviteHash from database using groupId
    describe('GET groupInviteHash', () => {
        // happy case - groupId and adminId is valid & hash exists
        it('should return the groupInviteHash', function(){
            return request(server)
                .get(`/api/inviteToGroup/${testAdminId}/${testGroupId}`)
                .set('authorization', token)
                .then(res => {
                    // status 200
                    expect(res.status).toBe(200);

                    // groupInviteHash
                    expect(res.body.groupInviteHash).toBeDefined();
                    testGroupInviteHash = res.body.groupInviteHash;
                })
        })
    }) 
    // Get GroupInfo and AdminInfo using groupInviteHash
    describe('get adminInfo and groupInfo using groupInviteHash', function(){
        it('should post groupInviteHash successfully', function(){
            return request(server)
                .get(`/api/inviteToGroup/verify/${testGroupInviteHash}`)
                .then(res => {
                    console.log('#######', testGroupInviteHash);
                    // status 200
                    expect(res.status).toBe(200);

                    // success message
                    expect(res.body.message).toBe('invite hash found');

                    // adminInfo
                    expect(res.body.adminInfo).toBeDefined();
                    expect(res.body.adminInfo.id).toBe(testAdminId);
                    expect(res.body.adminInfo.name).toBe(testAdminInfo.name);

                    // groupInfo
                    expect(res.body.groupInfo).toBeDefined();
                    // expect(res.body.groupInfo.id).toBe(testGroupId);
                    expect(res.body.groupInfo.groupName).toBe(testGroupInfo.groupName);
                })
        })
        // 2. error case - invalid groupInviteHash
        it('should get error when groupInviteHash is not found', function(){
            return request(server)
                .get('/api/inviteToGroup/verify/123567')
                // .set('authorization', token)
                .then(res => {
                    // status 404
                    expect(res.status).toBe(404);

                    // error message
                    expect(res.body.error).toBe('invalid group invite hash');
                })
        })
    })
    // Add contact to the group
    describe('addContact to the group by invitee', function(){
        // 1. happy case - successfully add contact to the group when groupId is valid
        it('should successfully add contact to the group', () => {
            return request(server)
                .post('/api/inviteToGroup/addContact')
                .send({...testContactInfo, adminId: testAdminId, groupId: testGroupId})
                .then(res => {
                    // status 201
                    expect(res.status).toBe(201);

                    // success message
                    expect(res.body.message).toBe('contact added successfylly to the group');

                    // contactId
                    expect(res.body.contactId).toBeDefined();
                })
        })
    })
    // Delete the group from the database
    describe('should delete the test group', function(){
        it('should delete successfully when groupID is valid', function() {
            return request(server)
                .delete(`/api/groups/${testAdminId}/${testGroupId}`)
                .send({adminId: testAdminId})
                .set('authorization', token)
                .then(res => {
                    // status 201
                    expect(res.status).toBe(201)

                    // success message
                    expect(res.body.message).toBe('group deleted successfully!')
                });
        });
    })
})