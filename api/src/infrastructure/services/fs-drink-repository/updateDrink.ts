import { type Drink } from '../../../domain/drink/drink.entity'
import { type DrinkRepository } from '../../../domain/drink/drink.repository'
import { type FSDrinkRepositoryConfig } from './fsDrinkRepositoryConfig'

export const createUpdateDrink = ({ readDatabase, writeDatabase }: FSDrinkRepositoryConfig): DrinkRepository['update'] => async (id, partialDrink) => {
  const drinks = await readDatabase()
  const index = drinks.findIndex(drink => drink.id === id)

  if (index < 0) {
    return null
  }

  const updatedDrink: Drink = {
    ...drinks[index],
    ...partialDrink,
    id
  }

  await writeDatabase([
    ...drinks.slice(0, index),
    updatedDrink,
    ...drinks.slice(index + 1)
  ])

  return updatedDrink
}
