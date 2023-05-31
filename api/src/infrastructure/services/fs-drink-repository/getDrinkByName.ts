import { type DrinkRepository } from '../../../domain/drink/drink.repository'
import { type FSDrinkRepositoryConfig } from './fsDrinkRepositoryConfig'

export const createGetDrinkByName =
({ readDatabase }: FSDrinkRepositoryConfig): DrinkRepository['getByName'] =>
  async (name) => {
    return (await readDatabase()).find(drink => drink.name === name) ?? null
  }
