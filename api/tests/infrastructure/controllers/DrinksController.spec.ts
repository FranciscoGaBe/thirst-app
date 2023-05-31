import request from 'supertest'

import app from '../../../src/app'

const mockDrinks = [
  { id: 1, name: 'test', price: 1, image: '1' },
  { id: 2, name: 'test2', price: 2, image: '2' }
]
const mockGetAllDrinksUseCase = jest.fn(() => mockDrinks)

jest.mock('../../../src/infrastructure/controllers/controller', () => {
  return {
    ...jest.requireActual('../../../src/infrastructure/controllers/controller'),
    createControllerConfig: () => {
      return {
        useCases: {
          drinks: {
            getAllDrinks: () => {
              return mockGetAllDrinksUseCase()
            }
          }
        }
      }
    }
  }
})

describe('Drinks Controller', () => {
  describe('GET /api/v1/drinks', () => {
    it('should return 200 OK', async () => {
      return await request(app).get('/api/v1/drinks').expect(200)
    })

    it('should return all drinks in response', async () => {
      return await request(app).get('/api/v1/drinks').expect([
        { drinkType: 'test', price: 1, image: '/images/1' },
        { drinkType: 'test2', price: 2, image: '/images/2' }
      ])
    })
  })
})
