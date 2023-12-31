import { createSalesUseCases } from '../../src/application/sales.usecases'
import { type DataRepository } from '../../src/domain'
import { type Drink } from '../../src/domain/drink/drink.entity'
import { type DrinkRepository } from '../../src/domain/drink/drink.repository'
import { type SaleRepository } from '../../src/domain/sale/sale.repository'

describe('sales usecases', () => {
  const mockDrink: Drink = Object.freeze({
    id: 1,
    name: 'test',
    cost: 0.2,
    price: 1,
    quantity: 1,
    image: ''
  })
  const drinkRepository: Pick<DrinkRepository, 'update' | 'getByName'> = {
    update: async (_id, drink) => drink as Drink,
    getByName: async (name) => {
      if (name !== mockDrink.name) {
        return null
      }
      return { ...mockDrink }
    }
  }
  const salesRepository: Pick<SaleRepository, 'create'> = {
    create: async (sale) => ({ id: 1, ...sale })
  }
  const dataRepository: Pick<DataRepository, 'drinks' | 'sales'> = {
    drinks: drinkRepository as DrinkRepository,
    sales: salesRepository as SaleRepository
  }

  describe('sellDrink', () => {
    it('returns a fail if not enough money is supplied', async () => {
      const useCases = createSalesUseCases(dataRepository)
      expect(await useCases.sellDrink(mockDrink, 0.4)).toEqual({
        success: false,
        error: `Not enough money supplied, drink price is ${mockDrink.price}.`
      })
    })

    it('returns a fail if not enough quantity is left', async () => {
      const useCases = createSalesUseCases(dataRepository)
      expect(
        await useCases.sellDrink({
          ...mockDrink,
          quantity: 0
        }, 2)
      ).toEqual({
        success: false,
        error: `No more drinks of type ${mockDrink.name} left.`
      })
    })

    it('returns a success', async () => {
      const useCases = createSalesUseCases(dataRepository)
      expect(
        await useCases.sellDrink(mockDrink, 5)
      ).toEqual({
        success: true,
        drink: {
          ...mockDrink,
          quantity: mockDrink.quantity - 1
        },
        sale: {
          id: 1,
          drinkId: mockDrink.id,
          profit: mockDrink.price - mockDrink.cost
        },
        moneyLeft: 5 - mockDrink.price
      })
    })
  })
})
