import { type DataRepository } from '../domain'
import { type DrinksUseCases, createDrinksUseCases } from './drinks.usecases'

export interface AppUseCases {
  drinks: DrinksUseCases
}

export const createAppUseCases = (dataReposity: DataRepository): AppUseCases => {
  return {
    drinks: createDrinksUseCases(dataReposity)
  }
}
