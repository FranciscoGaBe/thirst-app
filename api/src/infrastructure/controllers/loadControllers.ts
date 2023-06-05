import { type Application } from 'express'
import { createControllerConfig, type CreateController } from './controller'
import { createDrinksController } from './drinks/drinks.controller'
import { createSalesController } from './sales/sales.controller'

const controllersCreators: CreateController[] = [
  createDrinksController,
  createSalesController
]

export const loadControllers = (app: Application): void => {
  controllersCreators.forEach((createController) => {
    const { controllerRoute, router } = createController(
      createControllerConfig()
    )
    app.use(`/api/v1/${controllerRoute}`, router)
  })
}
