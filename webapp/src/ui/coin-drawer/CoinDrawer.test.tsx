import { fireEvent, render, screen } from '@testing-library/react'
import { StoreProvider } from '../../services/store'
import { CoinDrawer } from './CoinDrawer'

const mockIncrease = jest.fn()
jest.mock('../../application/increaseMoney', () => {
  return {
    useIncreaseMoney: () => {
      return {
        increase: (increaseAmount: number) => {
          return mockIncrease(increaseAmount)
        }
      }
    }
  }
})

const renderCoinDrawer = (): void => {
  render(
    <StoreProvider>
      <CoinDrawer />
    </StoreProvider>
  )
}

beforeEach(() => {
  mockIncrease.mockClear()
})
describe('DrinksDisplayer', () => {
  it('renders a presentation element', () => {
    renderCoinDrawer()
    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })
  it('has a button to add 0.5 money', () => {
    renderCoinDrawer()
    fireEvent.click(
      screen.getByRole('button', { name: 'Add 0.5' })
    )
    expect(mockIncrease).toHaveBeenCalledWith(0.5)
  })
  it('has a button to add 1 money', () => {
    renderCoinDrawer()
    fireEvent.click(
      screen.getByRole('button', { name: 'Add 1' })
    )
    expect(mockIncrease).toHaveBeenCalledWith(1)
  })
  it('has a button to add 2 money', () => {
    renderCoinDrawer()
    fireEvent.click(
      screen.getByRole('button', { name: 'Add 2' })
    )
    expect(mockIncrease).toHaveBeenCalledWith(2)
  })
})
