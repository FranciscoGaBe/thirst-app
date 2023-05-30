import path from 'node:path'
import { getDatabasePath } from '../fs-data-repository/getDatabasePath'

export const getDrinksDatabasePath = (): string => {
  return path.join(getDatabasePath(), 'drinks')
}
