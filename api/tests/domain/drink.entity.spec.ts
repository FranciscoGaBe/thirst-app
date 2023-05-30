import { type Drink, createDrink, substractQuantity } from '../../src/domain/drink.entity'

describe('drink entity', () => {
  describe('createDrink', () => {
    it('returns a Drink object with default properties', () => {
      expect(createDrink()).toEqual({
        id: -1,
        name: '',
        quantity: 0,
        price: 0,
        cost: 0,
        image: '',
      })
    })

    it('returns a Drink object with supplied properties', () => {
      const drink: Partial<Drink> = Object.freeze({
        id: 5,
        name: 'test'
      })
      expect(createDrink(drink)).toEqual({
        ...drink,
        quantity: 0,
        price: 0,
        cost: 0,
        image: '',
      })
    })
  })

  describe('substractQuantity', () => {
    it('returns given drink with updated quantity', () => {
      const drink: Drink = Object.freeze({
        ...createDrink(),
        quantity: 10,
      })
      expect(substractQuantity(drink, 3)).toEqual({
        ...drink,
        quantity: 7,
      })
    })

    it('returns null if not enough quantity is left', () => {
      const drink: Drink = Object.freeze(createDrink())
      expect(substractQuantity(drink, 5)).toEqual(null)
    })
  })
})