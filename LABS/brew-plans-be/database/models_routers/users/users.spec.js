const request = require('supertest');
const db = require('../../dbConfig.js')
const server = require('../../../api/server.js');

describe('the server', () => {
    describe('GET /', () => {
        
        it('should run the testing env', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })
        
        it('should return status of 200', () => {
            return request(server)
                .get('/users/allusers')
                .then(res => {
                    expect(res.status).toBe(200);
            })
        })

    })
})

describe('POST /register', function(){

    beforeEach(async () => {
        await db('users').truncate();
    })


    const username = 'testAccount'
    const password = 'testPassword'
    var user = { username, password}

    it('it responds with 201 if request was good', function(done) {
        request(server)
            .post('/users/register')
            .send({"email":"testingtest@gmail.com","password":"admin"})
            .expect(201, done)
        });

    it('it responds with 500 if request was bad', function(done) {
            request(server)
                .post('/users/register')
                .type('json')
                .send()
                .end(function(err, res) {
                    expect(res.status).toBe(500)
                    if (err) return done(err);
                    done();
            });
        });   
    });

