import { type Drink } from '../domain/drink'
import { type Money } from '../domain/money'

export interface DrinkStorageService {
  drinks: Drink[]
  setDrinks: (drinks: Drink[]) => void
}

export interface MoneyStorageService {
  money: Money
  increaseMoney: (increaseAmount: number) => void
  setMoneyAmount: (amount: number) => void
}

export type StorageService = DrinkStorageService & MoneyStorageService

export interface DrinkRepositoryService {
  getAllDrinks: () => Promise<Drink[]>
}

export interface SaleSuccess {
  success: true
  quantityLeft: number
  moneyLeft: number
}

export interface SaleFail {
  success: false
  error: string
}

export interface SaleRepositoryService {
  createSale: (drinkType: string, moneyAmount: number) => Promise<SaleSuccess | SaleFail>
}
