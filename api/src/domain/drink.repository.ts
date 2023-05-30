import { type Drink } from './drink.entity'

export interface DrinkRepository {
  getAll: () => Drink[]
  getById: (id: Drink['id']) => Drink | null
  update: (id: Drink['id'], drink: Partial<Drink>) => Drink | null
}
