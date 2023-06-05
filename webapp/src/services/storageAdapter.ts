import {
  type MoneyStorageService,
  type DrinkStorageService,
  type ErrorStorageService
} from '../application/ports'
import { useStore } from './store'

export const useDrinkStorage = (): DrinkStorageService => {
  return useStore()
}

export const useMoneyStorage = (): MoneyStorageService => {
  return useStore()
}

export const useErrorStorage = (): ErrorStorageService => {
  return useStore()
}
