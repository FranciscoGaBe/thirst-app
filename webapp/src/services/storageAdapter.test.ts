import { renderHook } from '@testing-library/react'
import { useDrinkStorage, useErrorStorage, useMoneyStorage } from './storageAdapter'
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

      const test: Drink[] = [{ code: 'test', drinkType: 'test', image: 'test', price: 1 }]
      act(() => {
        result.current.setDrinks(test)
      })
      rerender()
      expect(result.current.drinks).toEqual(test)
    })
  })
  describe('useErrorStorage', () => {
    describe('getError', () => {
      it('returns empty string if error is not defined', () => {
        const { result } = renderHook(() => useErrorStorage(), { wrapper: StoreProvider })

        expect(result.current.getError('test')).toEqual('')
      })

      it('returns error message', () => {
        const { result } = renderHook(() => useErrorStorage(), { wrapper: StoreProvider })

        act(() => {
          result.current.setError('test', 'error message')
        })
        expect(result.current.getError('test')).toEqual('error message')
      })
    })

    describe('setError', () => {
      it('returns setError function to set error', () => {
        const { result, rerender } = renderHook(() => useErrorStorage(), { wrapper: StoreProvider })

        act(() => {
          result.current.setError('testType', 'error message')
        })
        rerender()
        expect(result.current.getError('testType')).toEqual('error message')
      })
    })

    describe('clearError', () => {
      it('clears error if it is defined', () => {
        const { result } = renderHook(() => useErrorStorage(), { wrapper: StoreProvider })

        act(() => {
          result.current.setError('test', 'error message')
        })
        expect(result.current.getError('test')).toEqual('error message')
        act(() => {
          result.current.clearError('test')
        })
        expect(result.current.getError('test')).toEqual('')
      })
    })
  })
})
