import { type DrinkStorageService } from '../application/ports'
import { useStore } from './store'

export const useDrinkStorage = (): DrinkStorageService => {
  return useStore()
}
