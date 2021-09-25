const server = require('../server.js');

const db = require('../../database/db-config.js');

const request = require('supertest');

const Students = require('../models/student.model.js');

describe('server', function() {
    it('should set environment to testing', function() {
        expect(process.env.DB_ENV).toBe('testing');
    });
});

let token;

describe.skip('admin - student routes', () => {
    beforeEach((done) => {
        request(server)
            .post('/api/auth/login')
            .send({ email: 'admin@email.com', password: 'pass' })
            .then(res => {
                console.log(res)
                token = res.body.token;
                done();
            })
    });

    describe('GET /students', () => {
        it('Should return a 200 status and JSON format.', async () => {
            const res = await request(server)
                .get('/students')
                .set({ 'Authorization': token });
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
        });
    });

});

describe.skip('user - student routes', () => {
    beforeEach((done) => {
        request(server)
            .post('/api/auth/login')
            .send({ email: 'parent@email.com', password: 'pass' })
            .then(res => {
                token = res.body.token;
                done();
            })
    });

    // valid request body
    const requestBody1 = {
        cpr: '8675309JENNY',
        first_name: 'Student1',
        additional_names: 'Abe Lincoln',
        gender: 'M',
        phone_number: '11-233455',
        email: 'student1@email.com',
        birthdate: new Date(2015, 3, 15),
        school_name: 'Abba',
        school_grade_id: 1,
        address: '1234 address st block 2345',
        primary_emergency_contact_name: 'Genghis Kahn',
        primary_emergency_relationship: 'guardian',
        primary_emergency_phone: '11-334455',
        emergency_contact_name: 'Mary Kahn',
        emergency_relationship: 'guardian',
        emergency_phone: '11-556677',
        notes: '',
        user_id: 6
    };

    // malformed request body
    const malformedRequestBody1 = {
        cpr: '',
        first_name: '',
        additional_names: 'Abe Lincoln',
        gender: 'M',
        phone_number: '22-233455',
        email: 'student1@email.com',
        birthdate: new Date(2015, 3, 15),
        school_name: 'Abba',
        school_grade_id: 1,
        address: '1234 address st block 2345',
        primary_emergency_contact_name: 'Genghis Kahn',
        primary_emergency_relationship: 'guardian',
        primary_emergency_phone: '11-334455',
        emergency_contact_name: 'Mary Kahn',
        emergency_relationship: 'guardian',
        emergency_phone: '11-556677',
        notes: '',
        user_id: 5
    };

    // edited request body
    const requestBody2 = {
        cpr: '8675309JENNY',
        first_name: 'Student1',
        additional_names: 'George Washington',
        gender: 'M',
        phone_number: '11-233455',
        email: 'student1@email.com',
        birthdate: new Date(2015, 3, 15),
        school_name: 'Abba',
        school_grade_id: 1,
        address: '1234 address st block 2345',
        primary_emergency_contact_name: 'Genghis Kahn',
        primary_emergency_relationship: 'guardian',
        primary_emergency_phone: '11-334455',
        emergency_contact_name: 'Mary Kahn',
        emergency_relationship: 'guardian',
        emergency_phone: '11-556677',
        notes: 'Previous Name: Abe Lincoln',
        user_id: 6
    };

    describe('POST /student', () => {
        it('Will fail with a 500 as it needs a unique cpr and there is a foreign key constraint', () => {
            return request(server)
                .post('/student')
                .set({ 'Authorization': token })
                .send(requestBody1)
                .then(res => {
                    // console.log(res.body);
                    expect(res.status).toBe(500);
                    // expect(res.type).toMatch(/json/i);
                });
        });
    });
});
    // describe('GET /student/:studentID', () => {
    //     it('Should return a ')
    // })