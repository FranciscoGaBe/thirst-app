import { render, screen } from '@testing-library/react'
import App from './App'

jest.mock('./ui/vending-machine', () => {
  return {
    VendingMachine: () => {
      return <div role="presentation" aria-label="Vending Machine" />
    }
  }
})

describe('App', () => {
  it('renders VendingMachine component', () => {
    render(<App />)
    expect(
      screen.getByRole('presentation', { name: 'Vending Machine' })
    ).toBeInTheDocument()
  })
})
