import { Drink, createDrink } from '../../src/domain/drink.entity'

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
})