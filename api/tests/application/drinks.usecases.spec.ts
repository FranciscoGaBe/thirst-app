import { createDrinksUseCases } from '../../src/application/drinks.usecases'
import { type DataRepository } from '../../src/domain'
import { createDrink } from '../../src/domain/drink/drink.entity'
import { type DrinkRepository } from '../../src/domain/drink/drink.repository'

describe('drinks usecases', () => {
  describe('getAllDrinks', () => {
    it('returns an array of all drinks', async () => {
      const drinks = [createDrink()]
      const drinkRepository: DrinkRepository = {
        getAll: async () => {
          return drinks
        },
        getByName: async () => null,
        getById: async () => null,
        update: async () => null
      }
      const dataRepository: Pick<DataRepository, 'drinks'> = {
        drinks: drinkRepository
      }
      const useCases = createDrinksUseCases(dataRepository as DataRepository)
      expect(await useCases.getAllDrinks()).toEqual(drinks)
    })
  })
})
