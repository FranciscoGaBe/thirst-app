import { baseUrl, fetchApi } from './api'

global.fetch = (async () => {
  return {
    json: () => 'Test result'
  }
}) as any

describe('fetchApi', () => {
  it('calls given url', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch')
    const data = await fetchApi({
      url: 'testurl',
      method: 'POST',
      data: { data: 'data' },
      params: { params: 'params' }
    })

    expect(data).toBe('Test result')
    expect(fetchSpy).toHaveBeenCalledWith(`${baseUrl}/testurl?params=params`, {
      body: JSON.stringify({ data: 'data' }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
})
