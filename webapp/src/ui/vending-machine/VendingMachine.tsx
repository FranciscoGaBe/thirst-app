import styles from './VendingMachine.module.css'
import { DrinksDisplayer } from '../drinks-displayer'
import { CoinDrawer } from '../coin-drawer'
import { SelectionPanel } from '../selection-panel'

export const VendingMachine = (): JSX.Element => {
  return (
    <main className={ styles['vending-machine'] }>
      <DrinksDisplayer />
      <div className={ styles.bottom }>
        <SelectionPanel />
        <CoinDrawer />
      </div>
    </main>
  )
}
