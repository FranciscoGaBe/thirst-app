import { type Money } from '../domain/money'
import { useMoneyStorage } from '../services/storageAdapter'
import { type MoneyStorageService } from './ports'

interface GetMoneyConfig {
  moneyStorage: MoneyStorageService
}

interface GetMoneyReturn {
  money: Money
}

export type GetMoney = (config: GetMoneyConfig) => GetMoneyReturn

export const getMoney: GetMoney = ({ moneyStorage }) => {
  const { money } = moneyStorage

  return {
    money
  }
}

export const useGetMoney = (): GetMoneyReturn => {
  const moneyStorage: MoneyStorageService = useMoneyStorage()

  return getMoney({ moneyStorage })
}
