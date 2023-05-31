import { Router } from 'express'
import { type CreateController } from '../controller'
import { createIndexGetDrinksAction } from './index.get'

export const createDrinksController: CreateController = (config) => {
  const router = Router()

  router.get('/', createIndexGetDrinksAction(config))

  return {
    controllerRoute: 'drinks',
    router
  }
}
