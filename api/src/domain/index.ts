import { type DrinkRepository } from './drink/drink.repository'
import { type SaleRepository } from './sale/sale.repository'

export interface DataRepository {
  drinks: DrinkRepository
  sales: SaleRepository
}
