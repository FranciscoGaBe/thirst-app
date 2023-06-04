import { useIncreaseMoney } from '../../application/increaseMoney'

const increaseButtons: number[] = [
  0.5,
  1,
  2
]

export const CoinDrawer = (): JSX.Element => {
  const { increase } = useIncreaseMoney()

  return (
    <div role="presentation">
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
  )
}
