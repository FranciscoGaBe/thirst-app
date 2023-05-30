import { type DrinkRepository } from '../../../domain/drink.repository'
import { getAllDrinks } from './getAllDrinks'
import { getDrinkById } from './getDrinkById'
import { updateDrink } from './updateDrink'

export const createFSDrinkRepositoryService = (): DrinkRepository => {
  return {
    getAll: getAllDrinks,
    getById: getDrinkById,
    update: updateDrink
  }
}
