import { createDrinksUseCases } from '../../src/application/drinks.usecases'
import { type DataRepository } from '../../src/domain'
import { createDrink } from '../../src/domain/drink.entity'
import { type DrinkRepository } from '../../src/domain/drink.repository'

describe('drinks usecases', () => {
  describe('getAllDrinks', () => {
    it('returns an array of all drinks', async () => {
      const drinks = [createDrink()]
      const drinkRepository: DrinkRepository = {
        getAll: async () => {
          return drinks
        },
        getById: async () => null,
        update: async () => null
      }
      const dataRepository: DataRepository = {
        drinks: drinkRepository
      }
      const useCases = createDrinksUseCases(dataRepository)
      expect(await useCases.getAllDrinks()).toEqual(drinks)
    })
  })
})
