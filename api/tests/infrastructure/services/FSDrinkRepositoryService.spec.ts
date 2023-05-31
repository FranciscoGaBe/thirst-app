import { createFSRepositoryConfig } from '../../../src/infrastructure/services/fs-data-repository/fsRepositoryConfig'
import { createFSDrinkRepositoryService } from '../../../src/infrastructure/services/fs-drink-repository'

const mockDrinks = Object.freeze([
  Object.freeze({ id: 1, name: 'test' }),
  Object.freeze({ id: 2, name: 'test 2' }),
  Object.freeze({ id: 3, name: 'test 3' })
])

const mockReadFileSync = jest.fn((..._: unknown[]) => {
  return JSON.stringify(mockDrinks)
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

const getDrinksDatabasePath = (): string => {
  return createFSRepositoryConfig('drinks').databasePath
}

beforeEach(() => {
  mockReadFileSync.mockClear()
  mockWriteFileSync.mockClear()
})

describe('FSDrinkRepositoryService', () => {
  describe('getAll', () => {
    it('returns all drinks in the database', async () => {
      const drinks = await createFSDrinkRepositoryService().getAll()
      expect(mockReadFileSync).toHaveBeenCalledTimes(1)
      expect(mockReadFileSync).toHaveBeenCalledWith(
        getDrinksDatabasePath(),
        expect.anything()
      )
      expect(drinks).toEqual(mockDrinks)
    })
  })

  describe('getById', () => {
    it('returns a drink by it is id from the database', async () => {
      const mockDrink = mockDrinks[0]
      const drink = await createFSDrinkRepositoryService().getById(mockDrink.id)
      expect(mockReadFileSync).toHaveBeenCalledTimes(1)
      expect(mockReadFileSync).toHaveBeenCalledWith(
        getDrinksDatabasePath(),
        expect.anything()
      )
      expect(drink).toEqual(mockDrink)
    })

    it('returns null if id is not found', async () => {
      const drink = await createFSDrinkRepositoryService().getById(1234)
      expect(mockReadFileSync).toHaveBeenCalledTimes(1)
      expect(mockReadFileSync).toHaveBeenCalledWith(
        getDrinksDatabasePath(),
        expect.anything()
      )
      expect(drink).toEqual(null)
    })
  })

  describe('update', () => {
    it('updates drink to the database and returns it', async () => {
      const mockDrink = mockDrinks[1]
      const drink = await createFSDrinkRepositoryService().update(mockDrink.id, { quantity: 2 })
      const expectedDrink = {
        ...mockDrink,
        quantity: 2
      }
      expect(mockReadFileSync).toHaveBeenCalledTimes(1)
      expect(mockReadFileSync).toHaveBeenCalledWith(
        getDrinksDatabasePath(),
        expect.anything()
      )
      expect(mockWriteFileSync).toHaveBeenCalledTimes(1)
      expect(mockWriteFileSync).toHaveBeenCalledWith(
        getDrinksDatabasePath(),
        JSON.stringify([
          mockDrinks[0],
          expectedDrink,
          mockDrinks[2]
        ]),
        expect.anything()
      )
      expect(drink).toEqual(expectedDrink)
    })

    it('returns null if id is not found and does not update database', async () => {
      const drink = await createFSDrinkRepositoryService().update(1234, { quantity: 2 })
      expect(mockReadFileSync).toHaveBeenCalledTimes(1)
      expect(mockReadFileSync).toHaveBeenCalledWith(
        getDrinksDatabasePath(),
        expect.anything()
      )
      expect(mockWriteFileSync).not.toHaveBeenCalled()
      expect(drink).toEqual(null)
    })
  })
})
