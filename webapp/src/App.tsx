import styles from './App.module.css'
import { VendingMachine } from './ui/vending-machine'

const App = (): JSX.Element => {
  return (
    <div className={ styles.app }>
      <VendingMachine />
    </div>
  )
}

export default App
