interface Props {
  name: string
  price: number
  image: string
}

export const Drink = ({ name, price, image }: Props): JSX.Element => {
  return (
    <div>
      <img src={ image } alt={ name } />
      <div>{ price } moneys</div>
    </div>
  )
}
