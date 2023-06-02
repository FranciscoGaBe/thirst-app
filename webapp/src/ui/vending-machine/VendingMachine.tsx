import styles from './VendingMachine.module.css'
import { DrinksDisplayer } from '../drinks-displayer'

export const VendingMachine = (): JSX.Element => {
  return (
    <main className={ styles['vending-machine'] }>
      <DrinksDisplayer />
    </main>
  )
}
