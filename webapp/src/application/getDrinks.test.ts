import { renderHook, waitFor } from '@testing-library/react'
import { type Drink } from '../domain/drink'
import { getDrinks, useGetDrinks } from './getDrinks'
import { type DrinkStorageService, type DrinkRepositoryService } from './ports'

afterEach(() => {
  jest.clearAllTimers()
})
describe('getDrinks', () => {
  const testDrinks: Drink[] = []
  const drinkRepository: DrinkRepositoryService = {
    getAllDrinks: async () => testDrinks
  }

  const drinkStorage: DrinkStorageService = {
    drinks: testDrinks,
    setDrinks: () => null
  }
  it('returns drinks from storage', () => {
    expect(getDrinks({
      drinkRepository,
      drinkStorage
    })).toHaveProperty('drinks', testDrinks)
  })
  it('returns a function that get drinks from the repository and sets them', async () => {
    const setDrinksSpy = jest.fn()
    const { fetchDrinks } = getDrinks({
      drinkRepository,
      drinkStorage: {
        ...drinkStorage,
        setDrinks: setDrinksSpy
      }
    })
    void fetchDrinks()
    await waitFor(() => { expect(setDrinksSpy).toHaveBeenCalledWith(testDrinks) })
  })
})

describe('useGetDrinks', () => {
  it('injects dependecies to getDrinks and returns it as a hook', () => {
    const { result } = renderHook(() => useGetDrinks())
    expect(result.current).toHaveProperty('drinks')
    expect(result.current).toHaveProperty('fetchDrinks')
  })
})
