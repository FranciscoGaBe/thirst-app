import { renderHook } from '@testing-library/react'
import { type ErrorStorageService } from './ports'
import { handleError, useHandleError } from './handleError'
import { StoreProvider } from '../services/store'

afterEach(() => {
  jest.clearAllTimers()
})
describe('handleError', () => {
  const errorStorage: ErrorStorageService = {
    setError: () => null,
    clearError: () => null,
    getError: () => 'storage message'
  }

  describe('set', () => {
    it('sets error in storage', () => {
      const setErrorSpy = jest.spyOn(errorStorage, 'setError')
      const { set } = handleError({
        errorType: 'test',
        errorStorage
      })
      set('message')
      expect(setErrorSpy).toHaveBeenCalledWith('test', 'message')
    })
  })
  describe('clear', () => {
    it('clears error in storage', () => {
      const clearErrorSpy = jest.spyOn(errorStorage, 'clearError')
      const { clear } = handleError({
        errorType: 'test',
        errorStorage
      })
      clear()
      expect(clearErrorSpy).toHaveBeenCalledWith('test')
    })
  })
  describe('message', () => {
    it('has error message from storage', () => {
      const getErrorSpy = jest.spyOn(errorStorage, 'getError')
      const { message } = handleError({
        errorType: 'test',
        errorStorage
      })
      expect(getErrorSpy).toHaveBeenCalledWith('test')
      expect(message).toBe('storage message')
    })
  })
})

describe('useHandleError', () => {
  it('injects dependecies to handleError and returns it as a hook', () => {
    const { result } = renderHook(() => useHandleError('test'), { wrapper: StoreProvider })
    expect(result.current).toHaveProperty('clear')
    expect(result.current).toHaveProperty('set')
    expect(result.current).toHaveProperty('message')
  })
})
