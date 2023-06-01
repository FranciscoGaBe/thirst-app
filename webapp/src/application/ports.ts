import { type Drink } from '../domain/drink'

export interface DrinkStorageService {
  drinks: Drink[]
  setDrinks: (drinks: Drink[]) => void
}

export type StorageService = DrinkStorageService

export interface DrinkRepositoryService {
  getAllDrinks: () => Promise<Drink[]>
}
