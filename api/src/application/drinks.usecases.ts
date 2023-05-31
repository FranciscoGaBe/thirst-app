import { type DataRepository } from '../domain'
import { type Drink } from '../domain/drink.entity'

interface DrinksUseCases {
  getAllDrinks: () => Promise<Drink[]>
}

export const createDrinksUseCases = (dataReposity: DataRepository): DrinksUseCases => {
  return {
    getAllDrinks: async () => {
      return await dataReposity.drinks.getAll()
    }
  }
}
