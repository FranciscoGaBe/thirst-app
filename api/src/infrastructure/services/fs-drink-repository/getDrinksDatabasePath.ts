import path from 'node:path'
import { getDatabasePath } from '../fs-data-repository/getDatabasePath'

export const getDrinksDatabasePath = () => {
  return path.join(getDatabasePath(), 'drinks')
}