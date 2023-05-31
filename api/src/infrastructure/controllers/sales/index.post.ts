import { type CreateRoute } from '../controller'
import { type CreateSaleDTO, type CreateSaleResponseDTO } from './sales.dto'

// Quick validation, needs improvement
type ValidateBodyResult<Parameters> = {
  success: false
  missing: string
} | {
  success: true
  parameters: Parameters
}

const validateBody =
<
  Parameters extends object
>(body: Record<string, unknown>, parameters: Array<keyof Parameters>): ValidateBodyResult<Parameters> => {
  const validatedParameters: Partial<Parameters> = {}
  for (const parameter of parameters) {
    const value = body[parameter as keyof typeof body]
    if (value === undefined || value === null) {
      return {
        success: false,
        missing: parameter as string
      }
    }

    validatedParameters[parameter] = value as any
  }

  return {
    success: true,
    parameters: validatedParameters as Parameters
  }
}

export const createIndexPostSalesAction: CreateRoute<
CreateSaleResponseDTO,
unknown,
CreateSaleDTO
> = ({ useCases }) =>
  async (req, res) => {
    const validatedParameters = validateBody<CreateSaleDTO>(
      req.body,
      ['drinkType', 'moneyAmount']
    )

    if (!validatedParameters.success) {
      res.status(400).send({
        success: false,
        error: `Missing parameter "${validatedParameters.missing}".`
      })
      return
    }

    const { drinkType, moneyAmount } = validatedParameters.parameters

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
      quantityLeft: saleTransaction.drink.quantity,
      moneyLeft: saleTransaction.moneyLeft
    })
  }
