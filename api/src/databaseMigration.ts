export type DatabaseName = string
export interface DatabaseMigrationService<Record = unknown> {
  createDatabase: (databaseName: DatabaseName) => boolean
  addRecord: (databaseName: DatabaseName, record: Record) => boolean
}
export type Migration<Record> = (migrationService: DatabaseMigrationService<Record>) => boolean
