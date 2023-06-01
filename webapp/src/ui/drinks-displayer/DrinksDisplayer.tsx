import { useEffect } from 'react'
import { useGetDrinks } from '../../application/getDrinks'
import { Drink } from '../drink'

export const DrinksDisplayer = (): JSX.Element => {
  const { drinks, fetchDrinks } = useGetDrinks()

  useEffect(() => {
    void fetchDrinks()
  }, [])

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
