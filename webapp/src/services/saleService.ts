import { type SaleRepositoryService } from '../application/ports'
import { fetchApi } from './api'

export const useSaleRepository = (): SaleRepositoryService => {
  return {
    createSale: async (drinkType, moneyAmount) => {
      return await fetchApi({
        url: '/api/v1/sales',
        method: 'POST',
        data: {
          drinkType,
          moneyAmount
        }
      })
    }
  }
}
