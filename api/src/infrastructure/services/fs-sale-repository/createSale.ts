import { type Sale } from '../../../domain/sale/sale.entity'
import { type SaleRepository } from '../../../domain/sale/sale.repository'
import { type FSSaleRepositoryConfig } from './fsSaleRepositoryConfig'

export const createCreateSale =
({ readDatabase, writeDatabase }: FSSaleRepositoryConfig): SaleRepository['create'] =>
  async (sale) => {
    const createdSale: Sale = {
      id: Math.floor(Math.random() * 1e8),
      ...sale
    }

    await writeDatabase([
      ...await readDatabase(),
      createdSale
    ])

    return createdSale
  }
