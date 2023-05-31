import { type RequestHandler, type Router } from 'express'
import { type AppUseCases, createAppUseCases } from '../../application'
import { createFsDataRepositoryService } from '../services/fs-data-repository'

export interface ControllerConfig {
  useCases: AppUseCases
}

export interface ControllerOutput {
  controllerRoute: string
  router: Router
}

export type CreateController = (config: ControllerConfig) => ControllerOutput

export type CreateRoute<Response, Params = unknown, Body = unknown> =
(config: ControllerConfig) => RequestHandler<Params, Response, Body>

export const createControllerConfig = (): ControllerConfig => {
  const dataService = createFsDataRepositoryService()

  return {
    useCases: createAppUseCases(dataService)
  }
}
