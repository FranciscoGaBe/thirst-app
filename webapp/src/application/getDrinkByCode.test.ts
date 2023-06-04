import { renderHook } from '@testing-library/react'
import { type Drink } from '../domain/drink'
import { type DrinkStorageService } from './ports'
import { getDrinkByCode, useGetDrinkByCode } from './getDrinkByCode'
import { StoreProvider } from '../services/store'

describe('getDrinkByCode', () => {
  const testDrinks: Drink[] = [
    { code: 'A01', drinkType: 'test', image: '', price: 1 }
  ]

  const drinkStorage: Pick<DrinkStorageService, 'drinks'> = {
    drinks: testDrinks
  }
  it('returns drink if code exists', () => {
    expect(getDrinkByCode({
      drinkStorage: drinkStorage as DrinkStorageService
    })('A01')).toEqual(testDrinks[0])
  })

  it('returns null if code exists', () => {
    expect(getDrinkByCode({
      drinkStorage: drinkStorage as DrinkStorageService
    })('B00')).toEqual(null)
  })
})

describe('useGetDrinkByCode', () => {
  it('injects dependecies to getDrinkByCode and returns it as a hook', () => {
    const { result } = renderHook(() => useGetDrinkByCode(), { wrapper: StoreProvider })
    expect(result.current).toEqual(expect.any(Function))
  })
})
