import { type DataRepository } from '../domain'
import { type DrinksUseCases, createDrinksUseCases } from './drinks.usecases'
import { type SalesUseCases, createSalesUseCases } from './sales.usecases'

export interface AppUseCases {
  drinks: DrinksUseCases
  sales: SalesUseCases
}

export const createAppUseCases = (dataReposity: DataRepository): AppUseCases => {
  return {
    drinks: createDrinksUseCases(dataReposity),
    sales: createSalesUseCases(dataReposity)
  }
}
