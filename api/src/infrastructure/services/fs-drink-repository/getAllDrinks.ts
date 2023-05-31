import { type DrinkRepository } from '../../../domain/drink.repository'
import { type FSDrinkRepositoryConfig } from './fsDrinkRepositoryConfig'

export const createGetAllDrinks = ({ readDatabase }: FSDrinkRepositoryConfig): DrinkRepository['getAll'] => async () => {
  return await readDatabase()
}
