import axios from 'axios'

export const REQUEST_URL = 'http://dongguk-cse-graduationcheck.site'

type AxiosType = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export const CommonAxios = (type: AxiosType) => async (url: string, params: any) => {
  const washedUrl = `${REQUEST_URL}/${url}`

  if (type === 'GET') {
    return await axios.get(washedUrl, { params })
  }
  if (type === 'POST') {
    return await axios.post(washedUrl, params)
  }
  if (type === 'PATCH') {
    return await axios.patch(washedUrl, params)
  }
  if (type === 'DELETE') {
    return await axios.delete(washedUrl, { params })
  }
}
