import { type ErrorMessage, type ErrorType } from '../domain/appError'
import { useErrorStorage } from '../services/storageAdapter'
import { type ErrorStorageService } from './ports'

interface HandleErrorConfig {
  errorType: ErrorType
  errorStorage: ErrorStorageService
}

interface HandleErrorReturn {
  message: ErrorMessage
  clear: () => void
  set: (message: ErrorMessage) => void
}

export type HandleError = (config: HandleErrorConfig) => HandleErrorReturn

export const handleError: HandleError = ({
  errorType,
  errorStorage
}) => {
  const { setError, clearError, getError } = errorStorage

  return {
    message: getError(errorType),
    clear: () => { clearError(errorType) },
    set: (message) => { setError(errorType, message) }
  }
}

export const useHandleError = (errorType: ErrorType): HandleErrorReturn => {
  const errorStorage: ErrorStorageService = useErrorStorage()

  return handleError({ errorType, errorStorage })
}
