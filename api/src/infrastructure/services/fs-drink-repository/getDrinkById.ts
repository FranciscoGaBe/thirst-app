import { type DrinkRepository } from '../../../domain/drink/drink.repository'
import { type FSDrinkRepositoryConfig } from './fsDrinkRepositoryConfig'

export const createGetDrinkById = ({ readDatabase }: FSDrinkRepositoryConfig): DrinkRepository['getById'] => async (id) => {
  return (await readDatabase()).find(drink => drink.id === id) ?? null
}
