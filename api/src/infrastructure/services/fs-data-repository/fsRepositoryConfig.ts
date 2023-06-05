import path from 'node:path'
import fs from 'node:fs'

export interface FSRepositoryConfig<Record = unknown> {
  databaseRootPath: string
  databasePath: string
  readDatabase: () => Promise<Record[]>
  writeDatabase: (data: Record[]) => Promise<boolean>
}

const databaseRootPath = path.join(__dirname, '..', '..', '..', '..', 'database')
export const createFSRepositoryConfig = <Record = unknown>(databaseName: string): FSRepositoryConfig<Record> => {
  const databasePath = path.join(databaseRootPath, `${databaseName}.json`)

  return {
    databaseRootPath,
    databasePath,
    readDatabase: async () => {
      return JSON.parse(
        fs.readFileSync(databasePath, {
          encoding: 'utf-8'
        })
      )
    },
    writeDatabase: async (data) => {
      fs.writeFileSync(
        databasePath,
        JSON.stringify(data),
        {
          encoding: 'utf-8'
        }
      )

      return true
    }
  }
}
