import { createDrinksUseCases } from '../../src/application/drinks.usecases'
import { type DataRepository } from '../../src/domain'
import { createDrink } from '../../src/domain/drink.entity'
import { type DrinkRepository } from '../../src/domain/drink.repository'

describe('drinks usecases', () => {
  describe('getAllDrinks', () => {
    it('returns an array of all drinks', () => {
      const drinks = [createDrink()]
      const drinkRepository: DrinkRepository = {
        getAll: () => {
          return drinks
        },
        getById: () => null,
        update: () => null
      }
      const dataRepository: DataRepository = {
        drinks: drinkRepository
      }
      const useCases = createDrinksUseCases(dataRepository)
      expect(useCases.getAllDrinks()).toEqual(drinks)
    })
  })
})
