const server = require('../index.js');
const request = require('supertest');
const db = require('../db/dbinit');

describe('GET request on Review', () => {
  test('should return a status code of 200', async () => {
    const response = await request(server).get('/api/review');
    expect(response.status).toBe(200);
  });

  test('should return a defined object', async () => {
    const response = await request(server).get('/api/review');
    expect(response.body).toBeDefined();
  });

  test('should return a status message of OK', async () => {
    const response = await request(server).get('/api/review');
    expect(response.res.statusMessage).toBe('OK');
  });
});

describe('GET BY ID test', () => {
  let singleReviewId;

  const review = {
    title: 'Big donuts',
    rating: 2.7,
    body: 'Dousghnuuts for police',
    business_id: 1,
    reviewer_id: 1
  };
  beforeEach(async () => {
    const response = await request(server)
      .post('/api/review')
      .send(review);
    const [id] = response.body;
    singleReviewId = id;
  });

  afterEach(async () => {
    await db('reviews')
      .where({ id: singleReviewId })
      .del();
  });

  test('should be returning a defined reviews object', async () => {
    const response = await request(server).get(`/api/review/${singleReviewId}`);
    expect(response.body).toBeDefined();
  });
});

describe('POST business test', () => {
  let singleReviewId;

  const review = {
    title: 'Big donuts',
    rating: 2.7,
    body: 'Dougnuts for police',
    business_id: 1,
    reviewer_id: 1
  };

  afterEach(async () => {
    await db('reviews')
      .where({ id: singleReviewId })
      .del();
  });

  test('should be returning a defined business after post object', async () => {
    const response = await request(server)
      .post(`/api/review/`)
      .send(review);

    const [id] = response.body;
    singleReviewId = id;
    expect(response.body).toBeDefined();
  });

  test('should be returning a status code of 201 object', async () => {
    const response = await request(server)
      .post(`/api/review`)
      .send(review);

    const [id] = response.body;
    singleReviewId = id;
    expect(response.status).toBe(201);
  });
});

describe('DELETE test', async () => {
  const review = {
    title: 'Big donuts',
    rating: 2.7,
    body: 'Dougnuts for police',
    business_id: 1,
    reviewer_id: 1
  };

  let singleReviewId;

  beforeEach(async () => {
    const response = await request(server)
      .post('/api/review')
      .send(review);
    const [id] = response.body;
    singleReviewId = id;
  });

  test('should be deleting with the status code of 200', async () => {
    const response = await request(server).del(`/api/review/${singleReviewId}`);
    expect(response.status).toBe(200);
  });
});
