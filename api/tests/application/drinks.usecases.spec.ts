import { createDrinksUseCases } from '../../src/application/drinks.usecases'
import { DataRepository } from '../../src/domain'
import { createDrink } from '../../src/domain/drink.entity'
import { DrinkRepository } from '../../src/domain/drink.repository'

describe('drinks usecases', () => {
  describe('getAllDrinks', () => {
    it('returns an array of all drinks', () => {
      const drinks = [createDrink()]
      const drinkRepository = {
        getAll: () => {
          return drinks
        }
      } as DrinkRepository
      const dataRepository = {
        drinks: drinkRepository
      } as DataRepository
      const useCases = createDrinksUseCases(dataRepository)
      expect(useCases.getAllDrinks()).toEqual(drinks)
    })
  })
})