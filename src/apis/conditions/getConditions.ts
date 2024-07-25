import { commonAxios } from 'apis/common'

type Props = {
  [key: string]: any // 필요에 따라 수정
}

type Type = {
  id: number
  year: number
  tech: '심화' | '일반'
  total_minimum_credit: number
}[]

export const getConditions = async (params: Props) => {
  return await commonAxios('GET')('api/v1/conditions', { params }).then((res) => {
    const response = res?.data as Type
    return response
  })
}
