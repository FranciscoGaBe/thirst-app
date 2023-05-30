import fs from 'node:fs'
import path from 'node:path'

type FolderPath = string

const createDatabaseFolder = (rootPath: FolderPath): FolderPath => {
  const databaseFolderPath = path.join(rootPath, 'database')

  if (!fs.existsSync(databaseFolderPath)) {
    fs.mkdirSync(databaseFolderPath)
  }

  return databaseFolderPath
}

const getMigrations = (rootPath: FolderPath) => {
  const migrationsFolderPath = path.join(rootPath, 'src', 'migrations')

  if (!fs.existsSync(migrationsFolderPath)) {
    return []
  }

  return fs.readdirSync(migrationsFolderPath)
}

const migrateJson = () => {
  const rootPath = path.join(__dirname, '..')
  createDatabaseFolder(rootPath)
  getMigrations(rootPath)
}

migrateJson()