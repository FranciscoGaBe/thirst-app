import { Drink } from "./drink.entity"

export type DrinkReposity = {
  getAll: () => Drink[],
  getById: (id: Drink['id']) => Drink | null,
  update: (id: Drink['id'], drink: Partial<Drink>) => Drink,
}