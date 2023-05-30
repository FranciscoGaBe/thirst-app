import path from 'node:path'

export const getDatabasePath = (): string => {
  return path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'database'
  )
}
