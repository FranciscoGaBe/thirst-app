import { renderHook } from '@testing-library/react'
import { type Drink } from '../domain/drink'
import {
  type DrinkStorageService,
  type MoneyStorageService,
  type ErrorStorageService,
  type SaleRepositoryService
} from './ports'
import { buyDrink, useBuyDrink } from './buyDrink'

afterEach(() => {
  jest.clearAllTimers()
})
describe('buyDrink', () => {
  const testDrinks: Drink[] = [
    { code: 'test', drinkType: 'test', image: '', price: 1 },
    { code: 'empty', drinkType: 'empty', image: '', price: 2 }
  ]

  const drinkStorage: DrinkStorageService = {
    drinks: testDrinks,
    setDrinks: () => null
  }
  const moneyStorage: Pick<MoneyStorageService, 'money' | 'setMoneyAmount'> = {
    money: { amount: 5, type: 'test' },
    setMoneyAmount: () => null
  }
  const errorStorage: Pick<ErrorStorageService, 'setError'> = {
    setError: () => null
  }
  const saleRepository: SaleRepositoryService = {
    createSale: async (drinkType, moneyAmount) => {
      switch (drinkType) {
        case 'error':
          return {
            success: false,
            error: 'Error message'
          }
        case 'empty':
          return {
            success: true,
            moneyLeft: 1,
            quantityLeft: 0
          }
        default:
          return {
            success: true,
            moneyLeft: moneyAmount - 2,
            quantityLeft: 1
          }
      }
    }
  }

  describe('buyDrink', () => {
    it('sets error if fail', async () => {
      const setErrorSpy = jest.spyOn(errorStorage, 'setError')
      const { buy } = buyDrink({
        drinkStorage,
        moneyStorage: moneyStorage as MoneyStorageService,
        errorStorage: errorStorage as ErrorStorageService,
        saleRepository
      })
      await buy('error')
      expect(setErrorSpy).toHaveBeenCalledWith('buy', 'Error message')
    })
    it('removes drink from storage if no more is left', async () => {
      const setDrinksSpy = jest.spyOn(drinkStorage, 'setDrinks')
      const { buy } = buyDrink({
        drinkStorage,
        moneyStorage: moneyStorage as MoneyStorageService,
        errorStorage: errorStorage as ErrorStorageService,
        saleRepository
      })
      await buy('empty')
      expect(setDrinksSpy).toHaveBeenCalledWith([testDrinks[0]])
    })
    it('sets remaining money left', async () => {
      const setMoneyAmountSpy = jest.spyOn(moneyStorage, 'setMoneyAmount')
      const { buy } = buyDrink({
        drinkStorage,
        moneyStorage: moneyStorage as MoneyStorageService,
        errorStorage: errorStorage as ErrorStorageService,
        saleRepository
      })
      await buy('test')
      expect(setMoneyAmountSpy).toHaveBeenCalledWith(3)
    })
  })
})

describe('useBuyDrink', () => {
  it('injects dependecies to buyDrink and returns it as a hook', () => {
    const { result } = renderHook(() => useBuyDrink())
    expect(result.current).toHaveProperty('buy')
  })
})
