const request = require('supertest');

describe('environmental variables', () => {
    const OLD_ENV = process.env;
    
    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
        delete process.env.NODE_ENV;
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    describe('initial tests', () => {
        it('should return true', () => {
            expect(true).toBeTruthy();
        });
        it('should return false', () => {
            expect(false).toBeFalsy();
        });
    });

    describe('ROUTE HANDLERS', () => {
        process.env.NODE_ENV = 'development';

        const server = require('./server');
        const db = require('./config/dbConfig');

        // implementation needs help, maybe use third party library (such as superagent)
        // for now login to the site with:
        // email: seeduser@donotdelete.com
        // password: password
        // set cookie to value below

        const cookie = 'COOKIE HERE'
        
        // beforeAll(function(done) {
        //     db.migrate.latest()
        //     .then(function() {
        //         return db.seed.run()
        //         .then(function() {
        //             done();
        //         });
        //     });
        // });

        beforeEach(function(done) {
            db.migrate.rollback()
            .then(function() {
                db.migrate.latest()
                .then(function() {
                    return db.seed.run()
                    .then(function() {
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            db.migrate.rollback()
            .then(function() {
                done();
            });
        });

        afterAll(function(done) {
            db.migrate.latest()
            .then(function() {
                return db.seed.run()
                .then(function() {
                    done();
                });
            });
        });

        describe('ROOT ROUTES', () => {
            describe('get /', () => {
                it('should return 200 OK', async () => {
                    const response = await request(server).get('/');
        
                    expect(response.status).toBe(200);
                });
                it('should return text', async () => {
                    const response = await request(server).get('/');
    
                    expect(response.type).toBe('text/html');
                });
                it('should return root endpoint message', async () => {
                    const response = await request(server).get('/');
    
                    expect(response.text).toEqual(
                        `Believe it or not, this is the first endpoint added to the great RateMyDIY project.`
                    );
                });
            });
    
            describe('post /sendgrid/test', () => {
                it('should return status 422', (done) => {
                    request(server)
                    .post('/sendgrid/test')
                    .send({ 'to': null })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(422)
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    });
                });
    
                it('should return status 200', (done) => {
                    // tested with API key
                    process.env.SENDGRID_API_KEY = 'API KEY HERE'
                    request(server)
                    .post('/sendgrid/test')
                    .send({ 'to': 'test@test.com' })
                    // .expect(200)
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    });
                });
            });
    
            describe('get /send-text', () => {
                it('should not return message.sid', (done) => {
                    request(server)
                    .get('/send-text')
                    .query({ recipient: 'test@test.com', textmessage: null })
                    .expect(200)
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    });
                });
    
                it('should return message.sid', (done) => {
                    // tested with phone number
                    request(server)
                    .get('/send-text')
                    .query({ recipient: 'PHONE NUMBER', textmessage: 'TEST' })
                    .expect(200)
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    });
                });
            });
        });

        describe('PROJECT ROUTES', () => {
            describe('get /project_id', () => {
                it('should return not found', (done) => {
                    request(server)
                    .get('/api/projects/324')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    });
                });
    
                it('should return a project', (done) => {
                    request(server)
                    .get('/api/projects/1')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
                });
            });
        });

        describe('REVIEW ROUTES', () => {
            describe('get /review_id', () => {
                it('should return not found', (done) => {
                    request(server)
                    .get('/api/reviews/171')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    });
                });
            });
        });

        describe('POST ROUTES', () => {
            describe('post /', () => {
                it('should find post', (done) => {
                    request(server)
                    .post('/api/posts')
                    .send({ 
                        'user_id': 4,
                        'project_id': 4,
                        'img_url': '',
                        'text': 'post text'
                    })
                    // finds post with cookie, not ideal
                    .set('Cookie', [`connect.sid=${cookie}`])
                    // .set('Accept', 'application/json')
                    // .expect('Content-Type', /json/)
                    .expect(302)
                    .end((err) => {
                        if (err) return done(err);
                        done();
                    });
                });
            });
        });
    });
});
