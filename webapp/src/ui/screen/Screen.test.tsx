import { render, screen } from '@testing-library/react'
import { Screen } from './Screen'

jest.mock('../../application/getMoney', () => {
  return {
    useGetMoney: () => {
      return {
        money: { amount: 2, type: 'moneys' }
      }
    }
  }
})

const renderScreen = (): void => {
  render(<Screen code="A01" error="Test error" />)
}

describe('Screen', () => {
  it('renders a presentation element', () => {
    renderScreen()
    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  it('displays code prop', () => {
    renderScreen()
    expect(screen.getByText('A01')).toBeInTheDocument()
  })

  it('displays error prop', () => {
    renderScreen()
    expect(screen.getByText('Test error')).toBeInTheDocument()
  })

  it('displays money', () => {
    renderScreen()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('moneys')).toBeInTheDocument()
  })
})
