import { type DataRepository } from '../domain'
import { type Drink } from '../domain/drink/drink.entity'

export interface DrinksUseCases {
  getAllDrinks: () => Promise<Drink[]>
  getDrinkByName: (drinkName: Drink['name']) => Promise<Drink | null>
}

export const createDrinksUseCases = (dataReposity: DataRepository): DrinksUseCases => {
  return {
    getAllDrinks: async () => {
      return await dataReposity.drinks.getAll()
    },
    getDrinkByName: async (drinkName) => {
      return await dataReposity.drinks.getByName(drinkName)
    }
  }
}
