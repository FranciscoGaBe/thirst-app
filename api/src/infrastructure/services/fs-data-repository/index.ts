import { type DataRepository } from '../../../domain'
import { createFSDrinkRepositoryService } from '../fs-drink-repository'

export const createFsDataRepositoryService = (): DataRepository => {
  return {
    drinks: createFSDrinkRepositoryService()
  }
}
