import request from 'supertest'

import app from '../../../src/app'

const mockDrinks = Object.freeze([
  { id: 1, name: 'test', price: 1, image: '1', quantity: 2 },
  { id: 2, name: 'test2', price: 2, image: '2', quantity: 0 }
])
jest.mock('../../../src/infrastructure/services/fs-data-repository', () => {
  return {
    ...jest.requireActual('../../../src/infrastructure/services/fs-data-repository'),
    createFsDataRepositoryService: () => {
      return {
        drinks: {
          getByName: (drinkName: string) => {
            return mockDrinks.find(({ name }) => name === drinkName) ?? null
          },
          update: (_: unknown, sale: unknown) => sale
        },
        sales: {
          create: (sale: unknown) => sale
        }
      }
    }
  }
})

describe('Sales Controller', () => {
  describe('POST /api/v1/sales', () => {
    it('should return 400 if drinkType is missing', async () => {
      await request(app).post('/api/v1/sales').send({
        moneyAmount: 5
      }).expect(400).expect({
        success: false,
        error: 'Missing parameter "drinkType".'
      })
    })

    it('should return 400 if moneyAmount is missing', async () => {
      await request(app).post('/api/v1/sales').send({
        drinkType: 'test'
      }).expect(400).expect({
        success: false,
        error: 'Missing parameter "moneyAmount".'
      })
    })

    it('should return 404 if drinkType is not found', async () => {
      await request(app).post('/api/v1/sales').send({
        drinkType: 'fake name',
        moneyAmount: 5
      }).expect(404).expect({
        success: false,
        error: 'Drink of type fake name not found.'
      })
    })

    it('should return 400 if not enough quantity is left', async () => {
      const res = await request(app).post('/api/v1/sales').send({
        drinkType: mockDrinks[1].name,
        moneyAmount: 5
      }).expect(400)
      expect(res.body).toEqual({
        success: false,
        error: expect.any(String)
      })
    })

    it('should return 400 if not enough money is available', async () => {
      const res = await request(app).post('/api/v1/sales').send({
        drinkType: mockDrinks[0].name,
        moneyAmount: 0.5
      }).expect(400)
      expect(res.body).toEqual({
        success: false,
        error: expect.any(String)
      })
    })

    it('should return success, quantity left and money left', async () => {
      const res = await request(app).post('/api/v1/sales').send({
        drinkType: mockDrinks[0].name,
        moneyAmount: 2
      }).expect(200)
      expect(res.body).toEqual({
        success: true,
        quantityLeft: mockDrinks[0].quantity - 1,
        moneyLeft: 2 - mockDrinks[0].price
      })
    })
  })
})
