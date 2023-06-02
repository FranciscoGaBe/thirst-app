import styles from './Drink.module.css'

interface Props {
  name: string
  price: number
  image: string
  code?: string
}

export const Drink = ({ name, price, image, code }: Props): JSX.Element => {
  return (
    <div className={ styles.drink }>
      <div className={ styles['drink-image'] }>
        <img src={ image } alt={ name } />
      </div>
      <div className={ styles['drink-price'] }>{ price } moneys</div>
      <div className={ styles['drink-code'] }>
        <span>
          { code }
        </span>
      </div>
    </div>
  )
}
