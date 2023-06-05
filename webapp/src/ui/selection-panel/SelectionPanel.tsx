import { useState } from 'react'
import { useGetDrinkByCode } from '../../application/getDrinkByCode'
import { useBuyDrink } from '../../application/buyDrink'
import styles from './SelectionPanel.module.css'

const keys: string[] = [
  ...Array(9).fill(0).map((_, index) => (9 - index).toString()), 'C', '0', 'A'
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
    <div role="presentation" className={ styles.panel }>
      <div className={ styles['code-panel'] }>{ code }</div>
      <div className={ styles.keyboard }>
        {
          keys.map(key => (
            <div key={ key }>
              <button
                  aria-label={ key === 'C' ? 'Clear' : key }
                  onClick={ () => { handleClick(key) } }
              >
                { key }
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}
