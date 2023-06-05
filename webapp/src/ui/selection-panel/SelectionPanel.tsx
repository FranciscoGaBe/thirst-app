import { useGetDrinkByCode } from '../../application/getDrinkByCode'
import { useBuyDrink } from '../../application/buyDrink'
import styles from './SelectionPanel.module.css'
import { useCodePanel } from './useCodePanel'

const keys: string[] = [
  ...Array(9).fill(0).map((_, index) => (9 - index).toString()), 'C', '0', 'A'
]

export const SelectionPanel = (): JSX.Element => {
  const getDrinkByCode = useGetDrinkByCode()
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

  return (
    <div role="presentation" className={ styles.panel }>
      <div className={ styles['code-panel'] }>{ code }</div>
      <div className={ styles.keyboard }>
        {
          keys.map(key => (
            <div key={ key }>
              <button
                  aria-label={ key === 'C' ? 'Clear' : key }
                  onClick={ () => { addKey(key) } }
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
