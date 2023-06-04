interface FetchApiOptions {
  url: string
  method?: 'GET' | 'POST'
  params?: Record<string, unknown>
  data?: Record<string, unknown>
}

// TODO: turn into env variable.
export const baseUrl = `${location.protocol}//${location.hostname}:8000`
const getUrlWithParams = (url: string, params: object): string => {
  const urlWithParams = new URL(url, baseUrl)

  Object.entries(params).forEach(([key, value]) => {
    urlWithParams.searchParams.set(key, value)
  })

  return urlWithParams.href
}

export const fetchApi = async <ResponseData = unknown>(
  { url, method = 'GET', data, params = {} }: FetchApiOptions
): Promise<ResponseData> => {
  const response = await fetch(
    getUrlWithParams(url, params),
    {
      method,
      body: (data === undefined) ? undefined : JSON.stringify(data)
    }
  )

  return await response.json() as ResponseData
}
