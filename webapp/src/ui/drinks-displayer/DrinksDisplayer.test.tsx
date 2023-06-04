import { render, screen } from '@testing-library/react'
import { DrinksDisplayer } from './DrinksDisplayer'
import { StoreProvider } from '../../services/store'

const mockDrinks = [
  { code: 'A00', drinkType: 'test1', price: 1, image: 'test1' },
  { code: 'A01', drinkType: 'test2', price: 2, image: 'test2' },
  { code: 'A02', drinkType: 'test3', price: 3, image: 'test3' }
]

const mockFetchDrinks = jest.fn()
jest.mock('../../application/getDrinks', () => {
  return {
    useGetDrinks: () => {
      return {
        drinks: mockDrinks,
        fetchDrinks: async () => {
          mockFetchDrinks()
        }
      }
    }
  }
})
const mockDrinkComponent = jest.fn((_: unknown) => <div />)
jest.mock('../drink', () => {
  return {
    Drink: (props: unknown) => {
      return mockDrinkComponent(props)
    }
  }
})

const renderDrinksDisplayer = (): void => {
  render(
    <StoreProvider>
      <DrinksDisplayer />
    </StoreProvider>
  )
}

beforeEach(() => {
  jest.useFakeTimers()
  mockDrinkComponent.mockClear()
  mockFetchDrinks.mockClear()
})
afterEach(() => {
  jest.clearAllTimers()
  jest.useRealTimers()
})
describe('DrinksDisplayer', () => {
  it('renders a presentation element', () => {
    renderDrinksDisplayer()
    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  it('renders drinks in store', async () => {
    renderDrinksDisplayer()
    expect(mockFetchDrinks).toHaveBeenCalledTimes(1)
    jest.runAllTimers()
    expect(mockDrinkComponent).toHaveBeenNthCalledWith(
      1, { code: 'A00', name: 'test1', price: 1, image: 'test1' }
    )
    expect(mockDrinkComponent).toHaveBeenNthCalledWith(
      2, { code: 'A01', name: 'test2', price: 2, image: 'test2' }
    )
    expect(mockDrinkComponent).toHaveBeenNthCalledWith(
      3, { code: 'A02', name: 'test3', price: 3, image: 'test3' }
    )
  })
})
