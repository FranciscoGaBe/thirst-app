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

  addRecord(database, {
    id: 4,
    name: 'Energy Drink',
    price: 5,
    cost: 3,
    quantity: 1,
    image: 'energy-drink.png'
  })

  addRecord(database, {
    id: 5,
    name: 'Green Tea',
    price: 1,
    cost: 0.4,
    quantity: 10,
    image: 'green-tea.png'
  })

  addRecord(database, {
    id: 6,
    name: 'Milk',
    price: 1,
    cost: 0.5,
    quantity: 5,
    image: 'milk.png'
  })

  addRecord(database, {
    id: 7,
    name: 'Sparkling Water',
    price: 2,
    cost: 0.8,
    quantity: 5,
    image: 'sparkling-water.png'
  })

  addRecord(database, {
    id: 8,
    name: 'Cocktail',
    price: 5,
    cost: 2,
    quantity: 5,
    image: 'cocktail.png'
  })

  addRecord(database, {
    id: 9,
    name: 'Lemonade',
    price: 1,
    cost: 0.1,
    quantity: 20,
    image: 'lemonade.png'
  })

  addRecord(database, {
    id: 10,
    name: 'Chocolate milk',
    price: 2,
    cost: 1.4,
    quantity: 10,
    image: 'chocolate-milk.png'
  })

  return true
}

export default drinksMigration
