const request = require('supertest');
const server = require('../api/server');
const token = require('./token');

// test data

const newContactInfo = {
  firstName: 'Test Contact',
  lastName: 'Test Contact',
  phoneNumber: '0000000000',
  email: 'test@email.com'
};

const changedContactInfo = {
  firstName: 'Tests Contact',
  lastName: 'Tests Contact',
  phoneNumber: '0000000000',
  email: 'test@email.com'
};

let testAdminId;
let testContactId;

// POST Contacts
// 1. happy case - post contact and map it to adminID
// 2. error case - invalid adminID in the request
describe('post contacts', function() {
  it('post contact and map it to adminID', function() {
    return request(server)
      .post('/api/contacts')
      .set('authorization', token)
      .send({ adminId: testAdminId, ...newContactInfo })
      .then(res => {
        expect(res.status).toBe(201);
        testContactId = res.body[0];
      });
  });

  // GET contact by contactID
  // 1. happy case - valid contactID
  // 2. error case -  invalid contactID

  describe('get a contact', () => {
    // happy case
    it('should successfully get a contact data', () => {
      return request(server)
        .get(`/api/contacts/${testAdminId}/:${testContactId}`)
        .set('authorization', token)
        .then(res => {
          // status 200
          expect(res.status).toBe(200);
        });
    });
  });

  // GET Contacts for adminId
  // 1. happy case - adminID is valid and admin has contacts
  // 2. happy case - adminID is valid but he doesnot have any contacts
  // 3. error case - invalid adminID

  // PUT contact
  // 1. happy case - edit contact with valid contactID
  // 2. error case - edit contact with invalid adminID

  describe('edit contact', function() {
    it('should edit contact with valid contactID', function() {
      return request(server)
        .put(`/api/contacts/${testContactId}/${testAdminId}`)
        .send({ ...changedContactInfo })
        .set('authorization', token)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    // error case
    it('should return 500, no update info provided', function() {
      return request(server)
        .put(`/api/contacts/${testContactId}/${testAdminId}`)
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });

  // DELETE contact
  // 1. happy case - delete contact with valid contactID
  // 2. error case - delete contact with invalid adminID
  describe('should delete contact', function() {
    it('should delete successfully when contactId is valid', function() {
      return request(server)
        .delete(`/api/contacts/${testAdminId}/:${testContactId}/`)
        .set('authorization', token)
        .then(res => {
          // status 201
          expect(res.status).toBe(201);

          // success message
          expect(res.body.message).toBe('contact deleted successfully!');
        });
    });
    it('should throw error with invalid contactId', () => {
      return request(server)
        .delete(`/api/contacts/67811/${testContactId}/${testAdminId}`)
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });
});
