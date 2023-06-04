import { renderHook } from '@testing-library/react'
import { type MoneyStorageService } from './ports'
import { increaseMoney, useIncreaseMoney } from './increaseMoney'

describe('increaseMoney', () => {
  const moneyStorage: Pick<MoneyStorageService, 'increaseMoney'> = {
    increaseMoney: () => null
  }
  it('returns drinks from storage', () => {
    const increaseMoneySpy = jest.spyOn(moneyStorage, 'increaseMoney')
    const { increase } = increaseMoney({
      moneyStorage: moneyStorage as MoneyStorageService
    })
    increase(10)
    expect(increaseMoneySpy).toHaveBeenCalledWith(10)
  })
})

describe('useIncreaseMoney', () => {
  it('injects dependecies to increaseMoney and returns it as a hook', () => {
    const { result } = renderHook(() => useIncreaseMoney())
    expect(result.current).toHaveProperty('increase')
  })
})
