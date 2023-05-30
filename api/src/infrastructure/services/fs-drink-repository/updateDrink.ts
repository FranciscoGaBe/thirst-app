import fs from 'node:fs'

import { type Drink } from '../../../domain/drink.entity'
import { type DrinkRepository } from '../../../domain/drink.repository'
import { getAllDrinks } from './getAllDrinks'
import { getDrinksDatabasePath } from './getDrinksDatabasePath'

export const updateDrink: DrinkRepository['update'] = (id, partialDrink) => {
  const drinks = [...getAllDrinks()]
  const index = drinks.findIndex(drink => drink.id === id)

  if (index < 0) {
    return null
  }

  const updatedDrink: Drink = {
    ...drinks[index],
    ...partialDrink,
    id
  }

  fs.writeFileSync(
    getDrinksDatabasePath(),
    JSON.stringify([
      ...drinks.slice(0, index),
      updatedDrink,
      ...drinks.slice(index + 1)
    ]),
    {
      encoding: 'utf-8'
    }
  )

  return updatedDrink
}
