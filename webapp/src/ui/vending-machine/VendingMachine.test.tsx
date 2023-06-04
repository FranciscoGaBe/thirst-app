import { render, screen } from '@testing-library/react'
import { VendingMachine } from './VendingMachine'

jest.mock('../drinks-displayer', () => {
  return {
    DrinksDisplayer: () => {
      return <div role="presentation" aria-label="Drinks Displayer" />
    }
  }
})

jest.mock('../coin-drawer', () => {
  return {
    CoinDrawer: () => {
      return <div role="presentation" aria-label="Coin Drawer" />
    }
  }
})

const renderVendingMachine = (): void => {
  render(<VendingMachine />)
}

describe('VendingMachine', () => {
  it('renders a main role element', () => {
    renderVendingMachine()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders DrinksDisplayer component', () => {
    renderVendingMachine()
    expect(
      screen.getByRole('presentation', { name: 'Drinks Displayer' })
    ).toBeInTheDocument()
  })

  it('renders CoinDrawer component', () => {
    renderVendingMachine()
    expect(
      screen.getByRole('presentation', { name: 'Coin Drawer' })
    ).toBeInTheDocument()
  })
})
