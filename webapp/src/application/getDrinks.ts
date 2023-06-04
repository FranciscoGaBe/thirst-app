import { type Drink } from '../domain/drink'
import { useDrinkRepository } from '../services/drinkService'
import { useDrinkStorage } from '../services/storageAdapter'
import { type DrinkRepositoryService, type DrinkStorageService } from './ports'

interface GetDrinksConfig {
  drinkStorage: DrinkStorageService
  drinkRepository: DrinkRepositoryService
}

interface GetDrinksReturn {
  drinks: Drink[]
  fetchDrinks: () => Promise<void>
}

export type GetDrinks = (config: GetDrinksConfig) => GetDrinksReturn

export const getDrinks: GetDrinks = ({ drinkRepository, drinkStorage }) => {
  const { drinks, setDrinks } = drinkStorage

  return {
    drinks,
    fetchDrinks: async () => {
      setDrinks(await drinkRepository.getAllDrinks())
    }
  }
}

export const useGetDrinks = (): GetDrinksReturn => {
  const drinkStorage: DrinkStorageService = useDrinkStorage()
  const drinkRepository: DrinkRepositoryService = useDrinkRepository()

  return getDrinks({ drinkRepository, drinkStorage })
}
