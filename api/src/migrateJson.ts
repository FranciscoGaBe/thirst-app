import fs from 'node:fs'
import path from 'node:path'

const createDatabaseFolder = (rootPath: string): string => {
  const databaseFolderPath = path.join(rootPath, 'database')

  if (!fs.existsSync(databaseFolderPath)) {
    fs.mkdirSync(databaseFolderPath)
  }

  return databaseFolderPath
}

const migrateJson = () => {
  const rootPath = path.join(__dirname, '..')
  createDatabaseFolder(rootPath)
}

migrateJson()