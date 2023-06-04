import { renderHook } from '@testing-library/react'
import { useSaleRepository } from './saleService'

const mockFetchApi = jest.fn<[], unknown[]>(() => [])
jest.mock('./api', () => {
  return {
    fetchApi: (...args: unknown[]) => {
      return mockFetchApi(...args)
    }
  }
})

describe('useSaleRepository', () => {
  it('returns a createSale function to call the api', async () => {
    const { result } = renderHook(() => useSaleRepository())
    await result.current.createSale('test', 2)
    expect(mockFetchApi).toHaveBeenCalledWith({
      url: expect.any(String),
      method: 'POST',
      data: {
        drinkType: 'test',
        moneyAmount: 2
      }
    })
  })
})
