const supertest = require('supertest')
const server = require('../server/server')

const request = supertest(server)

describe('server root', () => {
  it('responds to a get request', async () => {
    const response = await request.get('/')
    expect(response.status).toEqual(200)
    expect(response.text).toEqual("Family Tabs Api")
  })
}) 

describe('User notification data', () => {
  it('responds to a get request', async () => {
    const response = await request.get('/scheduledEventNameWithUsers')
    expect(response.status).toEqual(200)
    expect(response.type).toBe("application/json")
  })
}) 