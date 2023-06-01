interface Props {
  name: string
  price: number
  image: string
}

export const Drink = ({ name, price, image }: Props): JSX.Element => {
  return (
    <div>
      <h3>{ name }</h3>
      <img src={ image } alt={ name } />
      <div>{ price } moneys</div>
    </div>
  )
}
