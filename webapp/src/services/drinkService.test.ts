import { renderHook } from '@testing-library/react'
import { useDrinkRepository } from './drinkService'

const mockFetchApi = jest.fn<[], unknown[]>(() => [])
jest.mock('./api', () => {
  return {
    fetchApi: (...args: unknown[]) => {
      return mockFetchApi(...args)
    }
  }
})

describe('useDrinkRepository', () => {
  it('returns a getAllDrinks function to call the api', async () => {
    const { result } = renderHook(() => useDrinkRepository())
    await result.current.getAllDrinks()
    expect(mockFetchApi).toHaveBeenCalledWith({ url: expect.any(String) })
  })
})
