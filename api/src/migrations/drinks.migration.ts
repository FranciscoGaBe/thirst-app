import { type Migration } from '../databaseMigration'

interface DrinkRecord {
  id: number
  name: string
  price: number
  cost: number
  quantity: number
  image: string
}

const drinksMigration: Migration<DrinkRecord> = ({ createDatabase, addRecord }) => {
  const database = 'drinks'

  createDatabase(database)

  addRecord(database, {
    id: 1,
    name: 'Water',
    price: 1,
    cost: 0.2,
    quantity: 20,
    image: 'water.png'
  })

  addRecord(database, {
    id: 2,
    name: 'Cola',
    price: 2,
    cost: 1,
    quantity: 10,
    image: 'cola.png'
  })

  addRecord(database, {
    id: 3,
    name: 'Orange Juice',
    price: 1.5,
    cost: 0.4,
    quantity: 5,
    image: 'orange-juice.png'
  })

  return true
}

export default drinksMigration
