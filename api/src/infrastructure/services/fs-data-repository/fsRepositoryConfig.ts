import path from 'node:path'
import fs from 'node:fs'

export interface FSRepositoryConfig<Record = unknown> {
  databaseRootPath: string
  databasePath: string
  readDatabase: () => Record[]
  writeDatabase: (data: Record[]) => void
}

const databaseRootPath = path.join(__dirname, '..', '..', '..', '..', 'database')
export const createFSRespositoryConfig = <Record = unknown>(databaseName: string): FSRepositoryConfig<Record> => {
  const databasePath = path.join(databaseRootPath, databaseName)

  return {
    databaseRootPath,
    databasePath,
    readDatabase: () => {
      return JSON.parse(
        fs.readFileSync(databasePath, {
          encoding: 'utf-8'
        })
      )
    },
    writeDatabase: (data) => {
      fs.writeFileSync(
        databasePath,
        JSON.stringify(data),
        {
          encoding: 'utf-8'
        }
      )
    }
  }
}
