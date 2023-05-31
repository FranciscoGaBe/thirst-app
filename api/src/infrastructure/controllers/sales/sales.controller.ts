import { Router } from 'express'
import { type CreateController } from '../controller'
import { createIndexPostSalesAction } from './index.post'

export const createSalesController: CreateController = (config) => {
  const router = Router()

  router.post('/', createIndexPostSalesAction(config))

  return {
    controllerRoute: 'sales',
    router
  }
}
