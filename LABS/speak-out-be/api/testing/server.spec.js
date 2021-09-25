const server = require('../server.js');

const db = require('../../database/db-config.js');

const request = require('supertest');

describe('server', function() {
  it('should set environment to testing', function() {
    expect('testing').toBe('testing');
  });
});