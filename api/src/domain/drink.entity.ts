export type Drink = {
  id: number,
  name: string,
  price: number,
  cost: number,
  quantity: number,
  image: string,
}

export const createDrink = (drink: Partial<Drink> = {}): Drink => {
  return {
    id: -1,
    name: '',
    price: 0,
    cost: 0,
    quantity: 0,
    image: '',
    ...drink,
  }
}

/**
 * Substract quantity to drink quantity
 * @param drink 
 * @param substractQuantity 
 * @returns drink with updated quantity or null if not enough quantity left
 */
export const substractQuantity = (drink: Drink, substractQuantity: number): Drink | null => {
  const newQuantity = drink.quantity - substractQuantity
  if (newQuantity < 0) {
    return null
  }

  return {
    ...drink,
    quantity: newQuantity,
  }
}