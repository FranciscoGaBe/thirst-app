import { type Sale } from './sale.entity'

export interface SaleRepository {
  create: (sale: Omit<Sale, 'id'>) => Promise<Sale>
}
