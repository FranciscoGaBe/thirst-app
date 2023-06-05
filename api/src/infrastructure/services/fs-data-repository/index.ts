import { type DataRepository } from '../../../domain'
import { createFSDrinkRepositoryService } from '../fs-drink-repository'
import { createFSSaleRepositoryService } from '../fs-sale-repository'

export const createFsDataRepositoryService = (): DataRepository => {
  return {
    drinks: createFSDrinkRepositoryService(),
    sales: createFSSaleRepositoryService()
  }
}
