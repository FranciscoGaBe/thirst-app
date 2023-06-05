import { type Sale } from '../../../domain/sale/sale.entity'
import { type FSRepositoryConfig } from '../fs-data-repository/fsRepositoryConfig'

export interface FSSaleRepositoryConfig extends FSRepositoryConfig<Sale> {}
