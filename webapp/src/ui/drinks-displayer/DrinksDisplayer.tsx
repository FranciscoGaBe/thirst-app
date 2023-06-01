import { useDrinkStorage } from '../../services/storageAdapter'
import { Drink } from '../drink'

export const DrinksDisplayer = (): JSX.Element => {
  const { drinks } = useDrinkStorage()

  return (
    <div role="presentation">
      {
        drinks.map(({ drinkType, image, price }) => (
          <Drink
              key={ drinkType }
              name={ drinkType }
              price={ price }
              image={ image }
          />
        ))
      }
    </div>
  )
}
