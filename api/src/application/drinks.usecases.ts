import { type DataRepository } from '../domain'
import { type Drink } from '../domain/drink.entity'

interface DrinksUseCases {
  getAllDrinks: () => Drink[]
}

export const createDrinksUseCases = (dataReposity: DataRepository): DrinksUseCases => {
  return {
    getAllDrinks: () => {
      return dataReposity.drinks.getAll()
    }
  }
}
