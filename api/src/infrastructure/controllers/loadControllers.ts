import { type Application } from 'express'
import { createControllerConfig, type CreateController } from './controller'
import { createDrinksController } from './drinks/drinks.controller'

const controllersCreators: CreateController[] = [
  createDrinksController
]

export const loadControllers = (app: Application): void => {
  controllersCreators.forEach((createController) => {
    const { controllerRoute, router } = createController(
      createControllerConfig()
    )
    app.use(`/api/v1/${controllerRoute}`, router)
  })
}
