import { useMoneyStorage } from '../services/storageAdapter'
import { type MoneyStorageService } from './ports'

interface IncreaseMoneyConfig {
  moneyStorage: MoneyStorageService
}

interface IncreaseMoneyReturn {
  increase: (increaseAmount: number) => void
}

export type IncreaseMoney = (config: IncreaseMoneyConfig) => IncreaseMoneyReturn

export const increaseMoney: IncreaseMoney = ({ moneyStorage }) => {
  const { increaseMoney } = moneyStorage

  return {
    increase: increaseMoney
  }
}

export const useIncreaseMoney = (): IncreaseMoneyReturn => {
  const moneyStorage: MoneyStorageService = useMoneyStorage()

  return increaseMoney({ moneyStorage })
}
