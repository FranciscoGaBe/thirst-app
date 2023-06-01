import { render, screen } from '@testing-library/react'
import { VendingMachine } from './VendingMachine'

describe('VendingMachine', () => {
  it('renders a main role element', () => {
    render(<VendingMachine />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
