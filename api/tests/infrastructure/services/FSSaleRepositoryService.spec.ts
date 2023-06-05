import { type Sale } from '../../../src/domain/sale/sale.entity'
import { createFSRepositoryConfig } from '../../../src/infrastructure/services/fs-data-repository/fsRepositoryConfig'
import { createFSSaleRepositoryService } from '../../../src/infrastructure/services/fs-sale-repository'

const mockSales = Object.freeze<Sale[]>([
  { id: 1, drinkId: 4, profit: 1 },
  { id: 2, drinkId: 2, profit: 3 }
])
const mockReadFileSync = jest.fn((..._: unknown[]) => {
  return JSON.stringify(mockSales)
})

const mockWriteFileSync = jest.fn()

jest.mock('node:fs', () => {
  return {
    readFileSync: (...args: unknown[]) => {
      return mockReadFileSync(...args)
    },
    writeFileSync: (...args: unknown[]) => {
      return mockWriteFileSync(...args)
    }
  }
})

const getSalesDatabasePath = (): string => {
  return createFSRepositoryConfig('sales').databasePath
}

beforeEach(() => {
  mockReadFileSync.mockClear()
  mockWriteFileSync.mockClear()
})

describe('FSSaleRepositoryService', () => {
  describe('create', () => {
    it('saves sale to the database', async () => {
      const sale = await createFSSaleRepositoryService().create({
        drinkId: 1,
        profit: 5
      })
      expect(mockReadFileSync).toHaveBeenCalledTimes(1)
      expect(mockReadFileSync).toHaveBeenCalledWith(
        getSalesDatabasePath(),
        expect.anything()
      )
      expect(mockWriteFileSync).toHaveBeenCalledTimes(1)
      expect(mockWriteFileSync).toHaveBeenCalledWith(
        getSalesDatabasePath(),
        JSON.stringify([
          ...mockSales,
          sale
        ]),
        expect.anything()
      )
      expect(sale).toEqual({
        id: expect.any(Number),
        drinkId: 1,
        profit: 5
      })
    })
  })
})
