import { type Drink } from '../../../domain/drink/drink.entity'
import { type FSRepositoryConfig } from '../fs-data-repository/fsRepositoryConfig'

export interface FSDrinkRepositoryConfig extends FSRepositoryConfig<Drink> {}
