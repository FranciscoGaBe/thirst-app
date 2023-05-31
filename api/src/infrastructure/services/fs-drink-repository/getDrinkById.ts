import { type DrinkRepository } from '../../../domain/drink.repository'
import { type FSDrinkRepositoryConfig } from './fsDrinkRepositoryConfig'

export const createGetDrinkById = ({ readDatabase }: FSDrinkRepositoryConfig): DrinkRepository['getById'] => (id) => {
  return readDatabase().find(drink => drink.id === id) ?? null
}
