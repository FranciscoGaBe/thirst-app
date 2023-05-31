import { type Drink } from './drink.entity'

export interface DrinkRepository {
  getAll: () => Promise<Drink[]>
  getById: (id: Drink['id']) => Promise<Drink | null>
  getByName: (id: Drink['name']) => Promise<Drink | null>
  update: (id: Drink['id'], drink: Partial<Drink>) => Promise<Drink | null>
}
