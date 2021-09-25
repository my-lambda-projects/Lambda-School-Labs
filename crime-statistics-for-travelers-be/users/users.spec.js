const request = require('supertest')
const db = require('../config/db-config')
const server = require('../api/server')

describe('test jokes', () => {

    const users = {
        id: 1,
        username: "BryBryTheGuy",
        password: "BipolarBear"
        
    }

    describe('', () => {
        it('id', () => {
            expect(users).toHaveProperty("id")
        })
        it('username', () => {
            expect(users).toHaveProperty("username")
        })
        it('password', () => {
            expect(users).toHaveProperty("password")
        })
    })
})