import { type DrinkRepository } from '../../../domain/drink.repository'
import { getAllDrinks } from './getAllDrinks'

export const getDrinkById: DrinkRepository['getById'] = (id) => {
  return getAllDrinks().find(drink => drink.id === id) ?? null
}
