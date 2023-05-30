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