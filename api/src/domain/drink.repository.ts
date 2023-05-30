import { Drink } from "./drink.entity"

export type DrinkReposity = {
  getAll: () => Drink[],
  update: (id: Drink['id'], drink: Partial<Drink>) => Drink,
}