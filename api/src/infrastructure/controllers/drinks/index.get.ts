import { type CreateRoute } from '../controller'
import { type AllDrinksDTO } from './drinks.dto'

export const createIndexGetDrinksAction: CreateRoute<AllDrinksDTO> = ({ useCases }) =>
  async (req, res) => {
    const completeUrl = `${req.protocol}://${req.get('host') ?? ''}`
    const drinks = await useCases.drinks.getAllDrinks()
    const drinksDto: AllDrinksDTO = drinks.map(drink => {
      return {
        drinkType: drink.name,
        price: drink.price,
        image: `${completeUrl}/images/${drink.image}`
      }
    })
    res.send(drinksDto)
  }
