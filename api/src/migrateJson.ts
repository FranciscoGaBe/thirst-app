import fs from 'node:fs'
import path from 'node:path'

import { type DatabaseMigrationService, type Migration } from './databaseMigration'

type FolderPath = string
type FilePath = string

const createDatabaseFolder = (rootPath: FolderPath): FolderPath => {
  const databaseFolderPath = path.join(rootPath, 'database')

  if (fs.existsSync(databaseFolderPath)) {
    fs.rmSync(databaseFolderPath, { force: true, recursive: true })
  }

  fs.mkdirSync(databaseFolderPath)
  return databaseFolderPath
}

const getMigrations = (rootPath: FolderPath) => {
  const migrationsFolderPath = path.join(rootPath, 'src', 'migrations')

  if (!fs.existsSync(migrationsFolderPath)) {
    return []
  }

  return fs.readdirSync(migrationsFolderPath).map(migration => path.join(migrationsFolderPath, migration))
}

const createMigrationService = (databaseFolderPath: FolderPath): DatabaseMigrationService => {
  const getDatabasePath = (databaseName: FolderPath) => {
    return path.join(databaseFolderPath, `${databaseName}.json`)
  }

  return {
    createDatabase: (databaseName) => {
      const databasePath = getDatabasePath(databaseName)
      if (fs.existsSync(databasePath)) {
        return true
      }

      fs.writeFileSync(databasePath, '[]', {
        encoding: 'utf-8'
      })

      return true
    },
    addRecord: (databaseName, record) => {
      const databasePath = getDatabasePath(databaseName)

      if (!fs.existsSync(databasePath)) {
        return false
      }

      const records = JSON.parse(fs.readFileSync(databasePath, {
        encoding: 'utf-8'
      }))

      fs.writeFileSync(
        databasePath,
        JSON.stringify([...records, record]),
        {
          encoding: 'utf-8'
        }
      )
      return true
    }
  }
}

const runMigrations = (migrations: FilePath[], databaseFolderPath: FolderPath) => {
  migrations.forEach(migrationFilePath => {
    const runMigration = require(migrationFilePath).default as Migration<unknown>
    runMigration(createMigrationService(databaseFolderPath))
  })
}

const migrateJson = () => {
  const rootPath = path.join(__dirname, '..')
  const databaseFolderPath = createDatabaseFolder(rootPath)
  const migrations = getMigrations(rootPath)
  runMigrations(migrations, databaseFolderPath)
}

migrateJson()