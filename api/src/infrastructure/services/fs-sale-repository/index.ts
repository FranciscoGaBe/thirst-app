import { createFSRepositoryConfig } from '../fs-data-repository/fsRepositoryConfig'
import { type FSSaleRepositoryConfig } from './fsSaleRepositoryConfig'
import { type Sale } from '../../../domain/sale/sale.entity'
import { type SaleRepository } from '../../../domain/sale/sale.repository'
import { createCreateSale } from './createSale'

export const createFSSaleRepositoryService = (
  config: FSSaleRepositoryConfig = createFSRepositoryConfig<Sale>('sales')
): SaleRepository => {
  return {
    create: createCreateSale(config)
  }
}
