import { renderHook } from '@testing-library/react'
import { useMoneyStorage } from './storageAdapter'
import { StoreProvider } from './store'
import { act } from 'react-dom/test-utils'

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
})
