export interface Sale {
  id: number
  drinkId: number
  profit: number
}

export const createDrink = (sale: Partial<Sale> = {}): Sale => {
  return {
    id: -1,
    drinkId: -1,
    profit: 0,
    ...sale
  }
}
