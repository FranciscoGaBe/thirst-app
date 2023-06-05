import { useState } from 'react'
import { useGetDrinkByCode } from '../../application/getDrinkByCode'
import { useBuyDrink } from '../../application/buyDrink'

const keys: string[] = [
  'C', '0', 'A', ...Array(9).fill(0).map((_, index) => (index + 1).toString())
]

export const SelectionPanel = (): JSX.Element => {
  const [code, setCode] = useState('')
  const getDrinkByCode = useGetDrinkByCode()
  const { buy } = useBuyDrink()

  const clear = (): void => {
    setCode('')
  }

  const tryToBuy = (code: string): void => {
    const drink = getDrinkByCode(code)
    if (drink === null) {
      clear()
      return
    }
    void buy(drink.drinkType)
  }

  const addToCode = (code: string, key: string): void => {
    const newCode = `${code}${key}`
    setCode(newCode)
    if (newCode.length < 3) {
      return
    }
    tryToBuy(newCode)
  }

  const handleClick = (key: string): void => {
    if (key === 'C') {
      clear()
      return
    }
    if (code.length > 2) {
      return
    }
    if (code.length > 0 && key === 'A') {
      return
    }
    if (code.length === 0 && key !== 'A') {
      return
    }

    addToCode(code, key)
  }

  return (
    <div role="presentation">
      <div>{ code }</div>
      <div>
        {
          keys.map(key => (
            <button
                key={ key }
                aria-label={ key === 'C' ? 'Clear' : key }
                onClick={ () => { handleClick(key) } }
            >
              { key }
            </button>
          ))
        }
      </div>
    </div>
  )
}
