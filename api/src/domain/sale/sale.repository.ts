import { type Sale } from './sale.entity'

export interface SalesRepository {
  createSale: (sale: Omit<Sale, 'id'>) => Promise<Sale>
}
