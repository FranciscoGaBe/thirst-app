import { type CreateRoute } from '../controller'
import { type CreateSaleDTO, type CreateSaleResponseDTO } from './sales.dto'

export const createIndexPostSalesAction: CreateRoute<
CreateSaleResponseDTO,
unknown,
CreateSaleDTO
> = ({ useCases }) =>
  async (req, res) => {
    const { drinkType, moneyAmount } = req.body
    const drink = await useCases.drinks.getDrinkByName(drinkType)

    if (drink === null) {
      res.status(404).send({
        success: false,
        error: `Drink of type ${drinkType} not found.`
      })
      return
    }

    const saleTransaction = await useCases.sales.sellDrink(drink, moneyAmount)

    if (!saleTransaction.success) {
      res.status(400).send({
        success: false,
        error: saleTransaction.error
      })
      return
    }

    res.send({
      success: true,
      quantityLeft: saleTransaction.drink.quantity
    })
  }
