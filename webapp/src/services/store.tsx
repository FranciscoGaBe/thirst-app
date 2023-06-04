import React, { useState, useContext, type PropsWithChildren } from 'react'
import { type Drink } from '../domain/drink'
import { type StorageService } from '../application/ports'
import { type Money } from '../domain/money'

export type StoreInitialState = Partial<Pick<StorageService, 'drinks' | 'money'>>

interface Props {
  initialState?: StoreInitialState
}

const StoreContext = React.createContext<StorageService>({} as unknown as StorageService)

export const useStore = (): StorageService => useContext(StoreContext)

export const StoreProvider = (
  { initialState, children }: PropsWithChildren<Props>
): JSX.Element => {
  const [drinks, setDrinks] = useState<Drink[]>(initialState?.drinks ?? [])
  const [money, setMoney] = useState<Money>(initialState?.money ?? { amount: 0, type: 'moneys' })

  const store: StorageService = {
    drinks,
    money,
    setDrinks,
    setMoneyAmount: (amount) => {
      setMoney(prevState => {
        return { type: prevState.type, amount }
      })
    },
    increaseMoney: (increaseAmount) => {
      setMoney(prevState => {
        return { type: prevState.type, amount: prevState.amount + increaseAmount }
      })
    }
  }

  return (
    <StoreContext.Provider value={ store }>
      { children }
    </StoreContext.Provider>
  )
}
