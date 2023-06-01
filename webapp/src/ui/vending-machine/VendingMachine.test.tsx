import { render, screen } from '@testing-library/react'
import { VendingMachine } from './VendingMachine'

jest.mock('../drinks-displayer', () => {
  return {
    DrinksDisplayer: () => {
      return <div role="presentation" aria-label="Drinks Displayer" />
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
})
