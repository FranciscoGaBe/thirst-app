import { useGetDrinkByCode } from '../../application/getDrinkByCode'
import { useBuyDrink } from '../../application/buyDrink'
import styles from './SelectionPanel.module.css'
import { useCodePanel } from './useCodePanel'
import { Screen } from '../screen'
import { useHandleError } from '../../application/handleError'

const keys: string[] = [
  ...Array(9).fill(0).map((_, index) => (9 - index).toString()), 'C', '0', 'A'
]

export const SelectionPanel = (): JSX.Element => {
  const getDrinkByCode = useGetDrinkByCode()
  const { message, clear: clearError } = useHandleError('buy')
  const { buy } = useBuyDrink()
  const { code, addKey } = useCodePanel({
    onFullCode: async (code, clearCode) => {
      const drink = getDrinkByCode(code)
      if (drink === null) {
        clearCode()
        return
      }
      await buy(drink.drinkType)
      window.setTimeout(() => {
        clearCode()
      }, 2000)
    }
  })

  const onKeyClick = (key: string): void => {
    clearError()
    addKey(key)
  }

  return (
    <div role="presentation" className={ styles.panel }>
      <Screen code={ code } error={ message } />
      <div className={ styles.keyboard }>
        {
          keys.map(key => (
            <div key={ key }>
              <button
                  aria-label={ key === 'C' ? 'Clear' : key }
                  onClick={ () => { onKeyClick(key) } }
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
