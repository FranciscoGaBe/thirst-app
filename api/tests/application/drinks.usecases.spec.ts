import { createDrinksUseCases } from '../../src/application/drinks.usecases'
import { type DataRepository } from '../../src/domain'
import { type Drink } from '../../src/domain/drink/drink.entity'
import { type DrinkRepository } from '../../src/domain/drink/drink.repository'

describe('drinks usecases', () => {
  const mockDrinks = Object.freeze<Drink[]>([{
    id: 1,
    name: 'test',
    cost: 0.2,
    price: 1,
    quantity: 1,
    image: ''
  }])
  const drinkRepository: DrinkRepository = {
    getAll: async () => {
      return mockDrinks as Drink[]
    },
    getByName: async (drinkName: string) => {
      return mockDrinks.find(({ name }) => name === drinkName) ?? null
    },
    getById: async () => null,
    update: async () => null
  }
  const dataRepository: Pick<DataRepository, 'drinks'> = {
    drinks: drinkRepository
  }
  describe('getAllDrinks', () => {
    it('returns an array of all drinks', async () => {
      const useCases = createDrinksUseCases(dataRepository as DataRepository)
      expect(await useCases.getAllDrinks()).toEqual(mockDrinks)
    })
  })

  describe('getDrinkByName', () => {
    it('returns null if it is not found', async () => {
      const useCases = createDrinksUseCases(dataRepository as DataRepository)
      expect(await useCases.getDrinkByName('fake name')).toEqual(null)
    })

    it('returns drink if name is found', async () => {
      const useCases = createDrinksUseCases(dataRepository as DataRepository)
      expect(await useCases.getDrinkByName(mockDrinks[0].name)).toEqual(mockDrinks[0])
    })
  })
})
