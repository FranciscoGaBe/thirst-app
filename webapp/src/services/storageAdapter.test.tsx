import { renderHook } from '@testing-library/react'
import { useDrinkStorage, useMoneyStorage } from './storageAdapter'
import { StoreProvider } from './store'
import { act } from 'react-dom/test-utils'
import { type Drink } from '../domain/drink'

describe('storageAdapter', () => {
  describe('useMoneyStorage', () => {
    it('returns default value of money with "0" amount and type "moneys"', () => {
      const { result } = renderHook(() => useMoneyStorage(), { wrapper: StoreProvider })

      expect(result.current.money).toEqual({ amount: 0, type: 'moneys' })
    })
    it('returns setMoneyAmount function to set amount', () => {
      const { result, rerender } = renderHook(() => useMoneyStorage(), { wrapper: StoreProvider })

      act(() => {
        result.current.setMoneyAmount(10)
      })
      rerender()
      expect(result.current.money).toEqual({ amount: 10, type: 'moneys' })
    })
    it('returns increaseMoneyAmount function to set amount', () => {
      const { result, rerender } = renderHook(() => useMoneyStorage(), { wrapper: StoreProvider })

      act(() => {
        result.current.increaseMoney(10)
      })
      rerender()
      expect(result.current.money).toEqual({ amount: 10, type: 'moneys' })
      act(() => {
        result.current.increaseMoney(2)
      })
      rerender()
      expect(result.current.money).toEqual({ amount: 12, type: 'moneys' })
    })
  })
  describe('useDrinkStorage', () => {
    it('returns empty array of drinks by default', () => {
      const { result } = renderHook(() => useDrinkStorage(), { wrapper: StoreProvider })

      expect(result.current.drinks).toEqual([])
    })
    it('returns setDrinks function to set drinks', () => {
      const { result, rerender } = renderHook(() => useDrinkStorage(), { wrapper: StoreProvider })

      const test: Drink[] = [{ drinkType: 'test', image: 'test', price: 1 }]
      act(() => {
        result.current.setDrinks(test)
      })
      rerender()
      expect(result.current.drinks).toEqual(test)
    })
  })
})
