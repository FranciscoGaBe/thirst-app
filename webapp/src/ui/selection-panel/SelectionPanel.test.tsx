import { fireEvent, render, screen } from '@testing-library/react'
import { SelectionPanel } from './SelectionPanel'

const mockScreen = jest.fn((_props: unknown) => (
  <div role="presentation" aria-label="Screen"></div>
))
jest.mock('../screen', () => {
  return {
    Screen: (props: unknown) => {
      return mockScreen(props)
    }
  }
})

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

const mockUseHandleError = jest.fn()
const mockClearError = jest.fn()
jest.mock('../../application/handleError', () => {
  return {
    useHandleError: (type: unknown) => {
      mockUseHandleError(type)
      return {
        message: 'error message',
        clear: () => {
          mockClearError()
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
  mockScreen.mockClear()
  mockBuy.mockClear()
  mockGetDrinkByCode.mockClear()
  mockUseHandleError.mockClear()
  mockClearError.mockClear()
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runAllTimers()
  jest.useRealTimers()
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
    expect(mockScreen).toHaveBeenLastCalledWith(expect.objectContaining({ code: 'A01' }))
  })

  it('does not show code if it does not start with "A"', () => {
    renderSelectionPanel()
    inputCode('123')
    expect(mockScreen).not.toHaveBeenLastCalledWith(expect.objectContaining({ code: '123' }))
  })

  it('only accepts a maximum of 3 character code', () => {
    renderSelectionPanel()
    inputCode('A12345')
    expect(mockScreen).toHaveBeenLastCalledWith(expect.objectContaining({ code: 'A12' }))
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
    expect(mockScreen).not.toHaveBeenLastCalledWith(expect.objectContaining({ code: 'A99' }))
  })

  it('pressing "C" clears the code', () => {
    renderSelectionPanel()
    inputCode('A1')
    expect(mockScreen).toHaveBeenLastCalledWith(expect.objectContaining({ code: 'A1' }))
    fireEvent.click(
      screen.getByRole('button', { name: 'Clear' })
    )
    expect(mockScreen).not.toHaveBeenLastCalledWith(expect.objectContaining({ code: 'A1' }))
  })

  it('does not accept more than one "A" key', () => {
    renderSelectionPanel()
    inputCode('AA')
    expect(mockScreen).not.toHaveBeenLastCalledWith(expect.objectContaining({ code: 'AA' }))
  })

  it('pass error message to Screen component', () => {
    renderSelectionPanel()
    expect(mockScreen).toHaveBeenLastCalledWith(expect.objectContaining({ error: 'error message' }))
  })

  it('clears error message on code input', () => {
    renderSelectionPanel()
    expect(mockClearError).not.toHaveBeenCalled()
    inputCode('A')
    expect(mockClearError).toHaveBeenCalledTimes(1)
  })
})
