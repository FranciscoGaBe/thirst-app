import request from 'supertest'

import app from '../src/app'

describe('GET /ping', () => {
  it('should return 200 OK', async () => {
    return await request(app).get('/ping').expect(200)
  })

  it('should return `pong` in response', async () => {
    return await request(app).get('/ping').expect('pong')
  })
})
