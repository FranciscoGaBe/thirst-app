import { type Migration } from '../databaseMigration'

interface SaleRecord {
  id: number
  drinkId: number
  quantity: number
  profit: number
}

const salesMigration: Migration<SaleRecord> = ({ createDatabase }) => {
  const database = 'sales'

  createDatabase(database)

  return true
}

export default salesMigration
