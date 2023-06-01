import { render, screen } from '@testing-library/react'
import { DrinksDisplayer } from './DrinksDisplayer'

describe('DrinksDisplayer', () => {
  it('renders a presentation element', () => {
    render(<DrinksDisplayer />)
    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })
})
