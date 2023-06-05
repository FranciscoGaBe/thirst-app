import { render, screen } from '@testing-library/react'
import { Drink } from './Drink'

const renderDrink = (): void => {
  render(<Drink name={ 'Test drink' } price={ 2 } image={ 'TestImage' } />)
}

describe('Drink', () => {
  it('renders price prop alongside "moneys"', () => {
    renderDrink()
    expect(screen.getByText('2 moneys')).toBeInTheDocument()
  })

  it('renders image with image prop as source', () => {
    renderDrink()
    const image = screen.getByRole('img')
    expect(image).toHaveProperty('src', expect.stringContaining('TestImage'))
  })
})
