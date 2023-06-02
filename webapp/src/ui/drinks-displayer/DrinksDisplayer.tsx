import { useEffect } from 'react'

import styles from './DrinksDisplayer.module.css'
import { useGetDrinks } from '../../application/getDrinks'
import { Drink } from '../drink'

export const DrinksDisplayer = (): JSX.Element => {
  const { drinks, fetchDrinks } = useGetDrinks()

  useEffect(() => {
    void fetchDrinks()
  }, [])

  return (
    <div role="presentation" className={ styles['drinks-displayer'] }>
      {
        drinks.map(({ drinkType, image, price }, index) => (
          <Drink
              key={ drinkType }
              name={ drinkType }
              price={ price }
              image={ image }
              code={ `A${index.toString().padStart(2, '0')}` }
          />
        ))
      }
    </div>
  )
}
