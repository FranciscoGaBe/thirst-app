import { render, screen } from '@testing-library/react'
import { DrinksDisplayer } from './DrinksDisplayer'
import { type StoreInitialState, StoreProvider } from '../../services/store'

const mockDrink = jest.fn((_: unknown) => <div />)
jest.mock('../drink', () => {
  return {
    Drink: (props: unknown) => {
      return mockDrink(props)
    }
  }
})

const initialState: StoreInitialState = {
  drinks: [
    { drinkType: 'test1', price: 1, image: 'test1' },
    { drinkType: 'test2', price: 2, image: 'test2' },
    { drinkType: 'test3', price: 3, image: 'test3' }
  ]
}

const renderDrinksDisplayer = (): void => {
  render(
    <StoreProvider initialState={ initialState }>
      <DrinksDisplayer />
    </StoreProvider>
  )
}

beforeEach(() => {
  mockDrink.mockClear()
})
describe('DrinksDisplayer', () => {
  it('renders a presentation element', () => {
    renderDrinksDisplayer()
    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  it('renders drinks in store', () => {
    renderDrinksDisplayer()
    expect(mockDrink).toHaveBeenNthCalledWith(1, { name: 'test1', price: 1, image: 'test1' })
    expect(mockDrink).toHaveBeenNthCalledWith(2, { name: 'test2', price: 2, image: 'test2' })
    expect(mockDrink).toHaveBeenNthCalledWith(3, { name: 'test3', price: 3, image: 'test3' })
  })
})
