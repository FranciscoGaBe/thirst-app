import { createFsDataRepositoryService } from '../../../src/infrastructure/services/fs-data-repository'

const mockFsDrinkRepository = Symbol('drink-repository')
const mockCreateFsDrinkRepository = jest.fn((..._: unknown[]) => mockFsDrinkRepository)
jest.mock('../../../src/infrastructure/services/fs-drink-repository', () => {
  return {
    createFSDrinkRepositoryService: (...args: unknown[]) => {
      return mockCreateFsDrinkRepository(...args)
    }
  }
})
const mockFsSaleRepository = Symbol('sales-repository')
const mockCreateFsSaleRepository = jest.fn((..._: unknown[]) => mockFsSaleRepository)
jest.mock('../../../src/infrastructure/services/fs-sale-repository', () => {
  return {
    createFSSaleRepositoryService: (...args: unknown[]) => {
      return mockCreateFsSaleRepository(...args)
    }
  }
})

beforeEach(() => {
  mockCreateFsDrinkRepository.mockClear()
  mockCreateFsSaleRepository.mockClear()
})

describe('FSDataRepositoryService', () => {
  it('instantiates drink repository', () => {
    const dataRepository = createFsDataRepositoryService()
    expect(mockCreateFsDrinkRepository).toHaveBeenCalledTimes(1)
    expect(dataRepository).toHaveProperty('drinks', mockFsDrinkRepository)
  })

  it('instantiates drink repository', () => {
    const dataRepository = createFsDataRepositoryService()
    expect(mockCreateFsDrinkRepository).toHaveBeenCalledTimes(1)
    expect(dataRepository).toHaveProperty('sales', mockFsSaleRepository)
  })
})
