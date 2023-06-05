import { useIncreaseMoney } from '../../application/increaseMoney'
import styles from './CoinDrawer.module.css'

const increaseButtons: number[] = [
  0.5,
  1,
  2
]

export const CoinDrawer = (): JSX.Element => {
  const { increase } = useIncreaseMoney()

  return (
    <div role="presentation" className={ styles['coin-drawer'] }>
      <div className={ styles.slot }>&nbsp;</div>
      <div className={ styles.coins }>
        {
          increaseButtons.map(increaseAmount => (
            <button
                key={ increaseAmount }
                aria-label={ `Add ${increaseAmount}` }
                onClick={ () => { increase(increaseAmount) } }
            >
              { increaseAmount }
            </button>
          ))
        }
      </div>
    </div>
  )
}
