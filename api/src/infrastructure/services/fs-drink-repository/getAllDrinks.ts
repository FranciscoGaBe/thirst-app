import fs from 'node:fs'

import { DrinkRepository } from "../../../domain/drink.repository"
import { getDrinksDatabasePath } from "./getDrinksDatabasePath"

export const getAllDrinks: DrinkRepository['getAll'] = () => {
  const drinks = JSON.parse(
    fs.readFileSync(getDrinksDatabasePath(), {
      encoding: 'utf-8',
    })
  )

  return drinks
}