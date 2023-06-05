import { renderHook } from '@testing-library/react'
import { type MoneyStorageService } from './ports'
import { getMoney, useGetMoney } from './getMoney'
import { type Money } from '../domain/money'

describe('getMoney', () => {
  const testMoney: Money = {
    amount: 10,
    type: 'test'
  }

  const moneyStorage: Pick<MoneyStorageService, 'money'> = {
    money: testMoney
  }
  it('returns drinks from storage', () => {
    expect(getMoney({
      moneyStorage: moneyStorage as MoneyStorageService
    })).toHaveProperty('money', testMoney)
  })
})

describe('useGetMoney', () => {
  it('injects dependecies to getMoney and returns it as a hook', () => {
    const { result } = renderHook(() => useGetMoney())
    expect(result.current).toHaveProperty('money')
  })
})
