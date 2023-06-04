import { type Drink } from '../domain/drink'
import { useDrinkStorage } from '../services/storageAdapter'
import { type DrinkStorageService } from './ports'

interface GetDrinkByCodeConfig {
  drinkStorage: DrinkStorageService
}

type GetDrinkByCodeReturn = (code: string) => Drink | null

export type GetDrinkByCode = (config: GetDrinkByCodeConfig) => GetDrinkByCodeReturn

export const getDrinkByCode: GetDrinkByCode = ({ drinkStorage }) => {
  const { drinks } = drinkStorage

  return (code) => drinks.find(drink => drink.code === code) ?? null
}

export const useGetDrinkByCode = (): GetDrinkByCodeReturn => {
  const drinkStorage: DrinkStorageService = useDrinkStorage()

  return getDrinkByCode({ drinkStorage })
}
