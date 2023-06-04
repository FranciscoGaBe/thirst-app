import { type Drink } from '../domain/drink'
import { useSaleRepository } from '../services/saleService'
import { useDrinkStorage, useErrorStorage, useMoneyStorage } from '../services/storageAdapter'
import {
  type SaleRepositoryService,
  type DrinkStorageService,
  type MoneyStorageService,
  type ErrorStorageService
} from './ports'

interface BuyDrinkConfig {
  drinkStorage: DrinkStorageService
  moneyStorage: MoneyStorageService
  saleRepository: SaleRepositoryService
  errorStorage: ErrorStorageService
}

interface BuyDrinkReturn {
  buy: (drinkType: Drink['drinkType']) => Promise<void>
}

export type BuyDrink = (config: BuyDrinkConfig) => BuyDrinkReturn

export const buyDrink: BuyDrink = ({
  drinkStorage,
  moneyStorage,
  saleRepository,
  errorStorage
}) => {
  const { drinks, setDrinks } = drinkStorage
  const { setMoneyAmount, money } = moneyStorage
  const { setError } = errorStorage
  const { createSale } = saleRepository

  return {
    buy: async (drinkType) => {
      const response = await createSale(drinkType, money.amount)
      if (!response.success) {
        setError('buy', response.error)
        return
      }
      if (response.quantityLeft <= 0) {
        const index = drinks.findIndex(drink => drink.drinkType === drinkType)
        setDrinks([
          ...drinks.slice(0, index),
          ...drinks.slice(index + 1)
        ])
      }
      setMoneyAmount(response.moneyLeft)
    }
  }
}

export const useBuyDrink = (): BuyDrinkReturn => {
  const drinkStorage: DrinkStorageService = useDrinkStorage()
  const moneyStorage: MoneyStorageService = useMoneyStorage()
  const errorStorage: ErrorStorageService = useErrorStorage()
  const saleRepository: SaleRepositoryService = useSaleRepository()

  return buyDrink({ drinkStorage, moneyStorage, errorStorage, saleRepository })
}
