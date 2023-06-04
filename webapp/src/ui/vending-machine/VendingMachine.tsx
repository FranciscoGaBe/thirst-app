import styles from './VendingMachine.module.css'
import { DrinksDisplayer } from '../drinks-displayer'
import { CoinDrawer } from '../coin-drawer'

export const VendingMachine = (): JSX.Element => {
  return (
    <main className={ styles['vending-machine'] }>
      <DrinksDisplayer />
      <CoinDrawer />
    </main>
  )
}
