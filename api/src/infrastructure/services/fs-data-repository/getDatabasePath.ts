import path from 'node:path'

export const getDatabasePath = () => {
  return path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'database'
  )
}