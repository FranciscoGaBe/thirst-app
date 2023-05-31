import { type DrinkRepository } from '../../../domain/drink/drink.repository'
import { createFSRepositoryConfig } from '../fs-data-repository/fsRepositoryConfig'
import { createGetAllDrinks } from './getAllDrinks'
import { createGetDrinkById } from './getDrinkById'
import { createUpdateDrink } from './updateDrink'
import { type FSDrinkRepositoryConfig } from './fsDrinkRepositoryConfig'
import { type Drink } from '../../../domain/drink/drink.entity'

export const createFSDrinkRepositoryService = (
  config: FSDrinkRepositoryConfig = createFSRepositoryConfig<Drink>('drinks')
): DrinkRepository => {
  return {
    getAll: createGetAllDrinks(config),
    getById: createGetDrinkById(config),
    update: createUpdateDrink(config)
  }
}
