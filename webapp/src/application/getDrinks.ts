import { type Drink } from '../domain/drink'
import { useDrinkRepository } from '../services/drinkService'
import { useDrinkStorage } from '../services/storageAdapter'
import { type DrinkRepositoryService, type DrinkStorageService } from './ports'

interface GetDrinks {
  drinks: Drink[]
  fetchDrinks: () => Promise<void>
}

export const useGetDrinks = (): GetDrinks => {
  const storage: DrinkStorageService = useDrinkStorage()
  const { drinks, setDrinks } = storage
  const drinkRepository: DrinkRepositoryService = useDrinkRepository()

  const fetchDrinks: GetDrinks['fetchDrinks'] = async () => {
    setDrinks(await drinkRepository.getAllDrinks())
  }

  return {
    drinks,
    fetchDrinks
  }
}
