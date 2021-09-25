const request = require('supertest');
const server = require('./server.js');

describe('the server', () => {
    describe('GET /', () => {
        
        it('should run the testing env', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })
        
        it('should return status of 200', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
            })
        })
    })
})