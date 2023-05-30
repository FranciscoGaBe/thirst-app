import { Drink } from "./drink.entity"

export type DrinkReposity = {
  getAll: () => Drink[]
}