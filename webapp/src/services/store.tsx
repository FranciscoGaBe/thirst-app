import React, { useState, useContext, type PropsWithChildren } from 'react'
import { type Drink } from '../domain/drink'
import { type StorageService } from '../application/ports'

export type StoreInitialState = Partial<Pick<StorageService, 'drinks'>>

interface Props {
  initialState?: StoreInitialState
}

const StoreContext = React.createContext<StorageService>({} as unknown as StorageService)

export const useStore = (): StorageService => useContext(StoreContext)

export const StoreProvider = (
  { initialState, children }: PropsWithChildren<Props>
): JSX.Element => {
  const [drinks, setDrinks] = useState<Drink[]>(initialState?.drinks ?? [])

  const store: StorageService = {
    drinks,
    setDrinks
  }

  return (
    <StoreContext.Provider value={ store }>
      { children }
    </StoreContext.Provider>
  )
}
