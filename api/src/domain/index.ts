import { type DrinkRepository } from './drink/drink.repository'
import { type SalesRepository } from './sale/sale.repository'

export interface DataRepository {
  drinks: DrinkRepository
  sales: SalesRepository
}
