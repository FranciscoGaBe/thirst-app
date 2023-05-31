import { type DataRepository } from '../../../domain'
import { type SalesRepository } from '../../../domain/sale/sale.repository'
import { createFSDrinkRepositoryService } from '../fs-drink-repository'

export const createFsDataRepositoryService = (): DataRepository => {
  return {
    drinks: createFSDrinkRepositoryService(),
    sales: {} as unknown as SalesRepository
  }
}
