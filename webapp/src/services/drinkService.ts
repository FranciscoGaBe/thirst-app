import { type DrinkRepositoryService } from '../application/ports'
import { fetchApi } from './api'

export const useDrinkRepository = (): DrinkRepositoryService => {
  return {
    getAllDrinks: async () => {
      return await fetchApi({
        url: '/api/v1/drinks'
      })
    }
  }
}
