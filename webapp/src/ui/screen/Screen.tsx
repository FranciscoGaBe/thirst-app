import { useGetMoney } from '../../application/getMoney'
import styles from './Screen.module.css'

interface Props {
  code: string
  error: string
}

export const Screen = ({ code, error }: Props): JSX.Element => {
  const { money } = useGetMoney()

  return (
    <div role="presentation" className={ styles.screen }>
      <div className={ styles.money }>
        <b>{ money.amount }</b>
        { ' ' }
        <span>{ money.type }</span>
      </div>
      <div className={ styles.code }>{ code }</div>
      <div className={ styles.error } title={ error }>{ error }</div>
    </div>
  )
}
