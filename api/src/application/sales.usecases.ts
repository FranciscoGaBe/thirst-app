import { type DataRepository } from '../domain'
import { substractQuantity, type Drink } from '../domain/drink/drink.entity'
import { type Sale } from '../domain/sale/sale.entity'

interface DrinkSale {
  success: true
  sale: Sale
  drink: Drink
  moneyLeft: number
}

interface FailSale {
  success: false
  error: string
}

export interface SalesUseCases {
  sellDrink: (drink: Drink, moneySupplied: number) => Promise<DrinkSale | FailSale>
}

export const createSalesUseCases = (dataReposity: DataRepository): SalesUseCases => {
  return {
    sellDrink: async (drink, moneySupplied) => {
      if (moneySupplied < drink.price) {
        const saleFail: FailSale = {
          success: false,
          error: `Not enough money supplied, drink price is ${drink.price}.`
        }

        return saleFail
      }

      let updatedDrink = substractQuantity(drink, 1)
      if (updatedDrink == null) {
        const saleFail: FailSale = {
          success: false,
          error: `No more drinks of type ${drink.name} left.`
        }

        return saleFail
      }

      const sale = await dataReposity.sales.createSale({
        drinkId: updatedDrink.id,
        profit: updatedDrink.price - updatedDrink.cost
      })

      updatedDrink = await dataReposity.drinks.update(updatedDrink.id, updatedDrink) as Drink

      const saleSuccess: DrinkSale = {
        success: true,
        drink: updatedDrink,
        sale,
        moneyLeft: moneySupplied - updatedDrink.price
      }

      return saleSuccess
    }
  }
}
