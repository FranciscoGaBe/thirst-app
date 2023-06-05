import { fireEvent, render, screen } from '@testing-library/react'
import { SelectionPanel } from './SelectionPanel'

const mockBuy = jest.fn()
jest.mock('../../application/buyDrink', () => {
  return {
    useBuyDrink: () => {
      return {
        buy: (drinkType: string) => {
          return mockBuy(drinkType)
        }
      }
    }
  }
})

jest.mock('../../application/getMoney', () => {
  return {
    useGetMoney: () => {
      return {
        money: {
          type: 'moneys',
          amount: 5
        }
      }
    }
  }
})

const mockGetDrinkByCode = jest.fn()
jest.mock('../../application/getDrinkByCode', () => {
  return {
    useGetDrinkByCode: () => {
      return (code: string) => {
        mockGetDrinkByCode(code)
        if (code === 'A99') {
          return null
        }
        return {
          code,
          drinkType: 'test drink',
          image: '',
          price: 1
        }
      }
    }
  }
})

const renderSelectionPanel = (): void => {
  render(
    <SelectionPanel />
  )
}

const inputCode = (code: string): void => {
  code.split('').forEach((key) => {
    fireEvent.click(
      screen.getByRole('button', { name: key })
    )
  })
}

beforeEach(() => {
  mockBuy.mockClear()
  mockGetDrinkByCode.mockClear()
})
describe('SelectionDrawer', () => {
  it('renders a presentation element', () => {
    renderSelectionPanel()
    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  it('renders a numeric keyboard from 0 to 9', () => {
    renderSelectionPanel()
    Array(10).fill(0).forEach((_, index) => {
      expect(
        screen.getByRole('button', { name: index.toString() })
      ).toBeInTheDocument()
    })
  })

  it('renders an "A" key', () => {
    renderSelectionPanel()
    expect(
      screen.getByRole('button', { name: 'A' })
    ).toBeInTheDocument()
  })

  it('renders a "C" (clear) key', () => {
    renderSelectionPanel()
    expect(
      screen.getByRole('button', { name: 'Clear' })
    ).toBeInTheDocument()
  })

  it('shows inputted code', () => {
    renderSelectionPanel()
    inputCode('A01')
    expect(screen.getByText('A01')).toBeInTheDocument()
  })

  it('does not show code if it does not start with "A"', () => {
    renderSelectionPanel()
    inputCode('123')
    expect(screen.queryByText('123')).toBeFalsy()
  })

  it('only accepts a maximum of 3 character code', () => {
    renderSelectionPanel()
    inputCode('A12345')
    expect(screen.getByText('A12')).toBeInTheDocument()
  })

  it('calls buy when a 3 length code is inputted with a valid code', () => {
    renderSelectionPanel()
    inputCode('A01')
    expect(mockGetDrinkByCode).toHaveBeenCalledWith('A01')
    expect(mockBuy).toHaveBeenCalledWith('test drink')
  })

  it('resets code when a 3 length code is inputted and invalid', () => {
    renderSelectionPanel()
    inputCode('A99')
    expect(mockBuy).not.toHaveBeenCalled()
    expect(screen.queryByText('A99')).toBeFalsy()
  })
})
