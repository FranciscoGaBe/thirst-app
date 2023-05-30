import { DataRepository } from "../domain"
import { Drink } from "../domain/drink.entity"

type DrinksUseCases = {
  getAllDrinks: () => Drink[]
}

export const createDrinksUseCases = (dataReposity: DataRepository): DrinksUseCases => {
  return {
    getAllDrinks: () => {
      return dataReposity.drinks.getAll()
    }
  }
}